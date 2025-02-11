const Button = (props) => {
    return (
        <button
            type={props.type}
            className={props.className}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}

export default Button;