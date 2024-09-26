
type ButtonProp = {
    titulo: string,
    funcao: () => void,
}

const Button: React.FC <ButtonProp> = ({titulo, funcao}) => {
    return(<button onClick={funcao}>{titulo}</button>)
}

export default Button;