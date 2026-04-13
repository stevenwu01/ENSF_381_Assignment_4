function DisplayStatus(props) {
  return (
    <div style={{ color: props.type === "success" ? "green" : "red" }}>
      {props.message}
    </div>
  );
}

export default DisplayStatus;