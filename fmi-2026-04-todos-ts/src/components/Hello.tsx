
type HelloProps = {name: string}

export default function Hello({name}: HelloProps) {
  return (
    <div>Hello {name}, from React TS!</div>
  )
}