export class Random {
  constructor() {
    // Konstruktor tidak perlu menerima argumen dalam kasus ini
  }

  // Metode untuk menghasilkan angka acak antara min dan max (inklusif)
  static int(min, max) {
    if (min > max) {
      throw new Error('Nilai min tidak boleh lebih besar dari max');
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Metode untuk menghasilkan angka acak antara 0 dan 1
  static float() {
    return Math.random();
  }

  // Metode untuk menghasilkan angka acak antara min dan max (inklusif) dengan desimal
  static floatRange(min, max) {
    if (min > max) {
      throw new Error('Nilai min tidak boleh lebih besar dari max');
    }
    return Math.random() * (max - min) + min;
  }

  // Metode untuk menghasilkan angka acak dalam array tertentu
  static array(arr) {
    if (!Array.isArray(arr)) {
      throw new Error('Parameter harus berupa array');
    }
    const randomIndex = this.randomInt(0, arr.length - 1);
    return arr[randomIndex];
  }
}
