import { useNavigate } from "react-router-dom";

function payment() {
    const navigate = useNavigate();
    const next = () => {
        navigate('/confirmation');
    }
  return (
    <div>
      <h1>payment</h1>
      <button onClick={next}>Next</button>
    </div>
  )
}

export default payment
