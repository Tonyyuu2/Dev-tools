import

const Board = () => {
  let taskTitleArray = [
    {   
        key:1,
        stat: "TODo" ,
        title: "Brush teeth",

    },
    {
        key:2,
        stat: "Doing",
        title: "Eat ramen",

    },
    {
        key:3,
        stat: "Done",
        title: "clean cat shit box",

    }
]
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Header>Featured</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
    </Card>
  )
}