type Props = {
    name: string
}

export default function Hello({name}: Props) {
  return (
    <h2>Hello, {name}!</h2>
  )
}