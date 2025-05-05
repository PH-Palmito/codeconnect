export default function CampoDeDigitacao({ label, tipo, placeholder, value, setValor }) {
    return (
      <div className="form__campo-digitacao">
        <label htmlFor={tipo}>{label}</label>
        <input
          type={tipo}
          placeholder={placeholder}
          required
          id={tipo}
          value={value}
          onChange={(e) => setValor(e.target.value)}
        />
      </div>
    );
  }
