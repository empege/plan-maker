interface ElementRendererProps {
  id: string
  element: string
  text: string
  checked?: boolean | null
}

const Title: React.FC<ElementRendererProps> = ({ id, element, text }) => {
  return (
    <div>
      <h2>
        {id} {element} {text}
      </h2>
    </div>
  )
}

const Subtitle: React.FC<ElementRendererProps> = ({ id, element, text }) => {
  return (
    <div>
      <h2>
        {id} {element} {text}
      </h2>
    </div>
  )
}

const Checkbox: React.FC<ElementRendererProps> = ({
  id,
  element,
  text,
  checked,
}) => {
  return (
    <div>
      <h2>
        {id} {element} {text} {checked && "checked"}
      </h2>
    </div>
  )
}

const Text: React.FC<ElementRendererProps> = ({ id, element, text }) => {
  return (
    <div>
      <h2>
        {id} {element} {text}
      </h2>
    </div>
  )
}

const ElementRenderer: React.FC<ElementRendererProps> = (
  props: ElementRendererProps
) => {
  const elementToUse = () => {
    switch (props.element) {
      case "title":
        return <Title {...props} />
      case "subtitle":
        return <Subtitle {...props} />
      case "checkbox":
        return <Checkbox {...props} />
      case "text":
        return <Text {...props} />

      default:
        break
    }
  }

  return <div>{elementToUse()}</div>
}

export default ElementRenderer
