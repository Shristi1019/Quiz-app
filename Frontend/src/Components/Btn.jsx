import Button from 'react-bootstrap/Button';

function Btn(props) {
    return (
        <Button style={{backgroundColor: '#000000'}} onClick={props.onClickBtn}>{props.title}</Button>
    );
};


export default Btn;