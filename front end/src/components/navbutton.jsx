const Navbutton = ({ link, text, styleName }) => {
  return (
    <li><a href={link} className={styleName}>{text}</a></li>
  )
}

export default Navbutton;