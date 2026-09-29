function NMLogo({
  className = "",
}) {
  return (
    <span
      className={
        [
          "nm-logo",
          className,
        ]
          .filter(
            Boolean
          )
          .join(
            " "
          )
      }
      role="img"
      aria-label="NM Visual"
    >
      <span aria-hidden="true">
        N
      </span>

      <span aria-hidden="true">
        M
      </span>
    </span>
  );
}


export default NMLogo;