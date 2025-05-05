export default function Checkbox() {
    return (
      <>
        <div className="form__campo-checkbox">
          <input type="checkbox" id="lembrar" />
          <label htmlFor="lembrar" />
        </div>
        <p className="form__opcoes-texto">Lembrar-me</p>
      </>
    );
  }