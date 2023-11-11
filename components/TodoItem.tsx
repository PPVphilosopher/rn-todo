import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Todo } from 'utils'

type Props = {
  item: Todo
  isActive?: boolean
  onSelect: (item: Todo) => void
  onDelete: (item: Todo) => void
}

export const TodoItem = ({ item, isActive, onSelect, onDelete }: Props) => {
  return (
    <TouchableOpacity onPress={() => onSelect(item)}>
      <View style={[styles.container, isActive && styles.containerActive]}>
        <View style={[styles.circle, isActive && styles.circleActive]} />
        <Text style={styles.title}>{item.text}</Text>
        <Button title='Remove' color='pink' onPress={() => onDelete(item)} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    gap: 10,
    padding: 10,
    borderRadius: 10,
  },
  containerActive: {
    borderColor: 'blue',
    borderWidth: 1,
  },
  circle: {
    backgroundColor: 'lightblue',
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  circleActive: {
    backgroundColor: 'blue',
  },
  title: {
    flex: 1,
  },
})
