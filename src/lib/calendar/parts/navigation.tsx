const Navigation = ({ onClickPrev, onClickSwitch, onClickNext, switchContent, switchColSpan, switchProps }: any) => {
  return (
    <tr>
      <th
        className="nc-prev"
        onClick={onClickPrev}
      >
        <span>‹</span>
      </th>
      <th
        className="nc-switch"
        colSpan={switchColSpan}
        onClick={onClickSwitch}
        {...switchProps}
      >
        {switchContent}
      </th>
      <th
        className="nc-next"
        onClick={onClickNext}
      >
        <span>›</span>
      </th>
    </tr>
  )
}

export default Navigation
