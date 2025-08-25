import styles from '../styles/Contact.module.css';

const ContactPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Fale Conosco</h1>
      <div className={styles.formWrapper}>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nome</label>
            <input type="text" id="name" name="name" className={styles.input} required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" className={styles.input} required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">Mensagem</label>
            <textarea id="message" name="message" className={styles.textarea} required></textarea>
          </div>

          <button type="submit" className={styles.button}>Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
