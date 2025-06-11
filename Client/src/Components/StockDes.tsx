const StockDes = ({ stockdec, stockno, tag, stockdays }: any) => {
  // Check if tag is a percentage string like "-2.5%" or "3.0%"
  const isNegative = parseFloat(tag) < 0;
  return (
    <div className="containerStock" style={{ }}>
      <div className="Stock">
        <h3 className="stockdec">{stockdec}</h3>
        <div className="stockinner">
          <h2 className="stockno">{stockno}</h2>
          <div>
            <p className={`tag ${isNegative ? "red-tag" : "green-tag"}`}>
              {tag}
            </p>
            <p className="stockdays">{stockdays}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDes;
