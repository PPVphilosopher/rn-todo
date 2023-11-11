import AsyncStorage from '@react-native-async-storage/async-storage'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { TodoItem } from 'components'
import React, { useEffect, useState } from 'react'
import { StyleSheet, TextInput, View, Text, Button, Alert } from 'react-native'
import { RootStackParamList, Todo } from 'utils'

const STORAGE_KEY = 'todoList'
const MAX_LENGTH = 100
const SAMPLE_LIST: Todo[] = [
  { id: 1, text: 'First item' },
  { id: 2, text: 'Second item' },
  { id: 3, text: 'Third item' },
]

export const TodoListScreen: React.FC<
  NativeStackScreenProps<RootStackParamList, 'TodoList'>
> = () => {
  const [text, setText] = useState('')
  const [activeId, setActiveId] = useState(0)
  const [list, setList] = useState<Todo[]>(SAMPLE_LIST)

  const onSelect = ({ id, text }: Todo) => {
    setActiveId(id)
    setText(text)
  }

  const onClear = () => {
    setActiveId(0)
    setText('')
  }

  const onDelete = ({ id, text }: Todo) => {
    Alert.alert(
      'Delete todo item',
      `Are you sure to delete this todo item?\n\n${text}`,
      [
        {
          text: 'Delete',
          onPress: () => {
            updateList(list.filter((item) => item.id !== id))
            if (id === activeId) onClear()
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    )
  }

  const onSave = () => {
    const newText = text.trim()
    if (!newText) {
      Alert.alert('Save failed', 'Cannot save blank text.', undefined, {
        cancelable: true,
      })
      return
    }

    const newList = [...list]
    const item = newList.find((item) => item.id === activeId)

    if (item) {
      item.text = newText
    } else {
      newList.push({
        id: (newList[newList.length - 1]?.id ?? 0) + 1,
        text: newText,
      })
    }

    updateList(newList)
    onClear()
  }

  const updateList = async (newList: Todo[]) => {
    // Store data to storage for future use
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newList))
    setList(newList)
  }

  useEffect(() => {
    ;(async () => {
      try {
        // Get data from storage
        const data = await AsyncStorage.getItem(STORAGE_KEY)
        const list = JSON.parse(data!)
        if (list.length) setList(list)
      } catch (e) {}
    })()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <Text style={styles.title}>Todo:</Text>
        {list.map((todo) => (
          <TodoItem
            key={todo.id}
            item={todo}
            isActive={activeId === todo.id}
            onSelect={onSelect}
            onDelete={onDelete}
          />
        ))}
      </View>
      <View style={styles.inputBox}>
        <TextInput
          placeholder='Enter here'
          style={styles.input}
          value={text}
          onChangeText={setText}
          autoFocus
          maxLength={MAX_LENGTH}
        />
        <Text style={styles.counter}>
          {text.length}/{MAX_LENGTH}
        </Text>
        <Button title={activeId ? 'Update' : 'Add'} onPress={onSave} />
        {activeId > 0 && <Button title='Cancel' onPress={onClear} />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  title: {
    fontSize: 20,
  },
  list: {
    gap: 10,
  },
  inputBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    gap: 10,
  },
  input: {
    flex: 1,
  },
  counter: {
    fontSize: 10,
  },
})
