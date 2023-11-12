class CustomDate extends Date {
  constructor(dateStr) {
    super(dateStr);
  }

  formatDate() {
    const day = this.getDate().toString().padStart(2, '0');
    const month = (this.getMonth() + 1).toString().padStart(2, '0');
    const year = this.getFullYear();
    return `${day}/${month}/${year}`;
  }
}

export default CustomDate;
