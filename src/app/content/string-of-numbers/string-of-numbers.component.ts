import { Component, Directive, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-string-of-numbers',
  templateUrl: './string-of-numbers.component.html',
  styleUrls: ['./string-of-numbers.component.css']
})
export class StringOfNumbersComponent implements OnInit {
  numerosIngresados: number[] = [];
  repeticiones: Map<number, number> = new Map();
  numComma: string = '';

  constructor() {

  }

  ngOnInit() {

  }



  keyUpEvent(e: any) {
    let numComma = (e.target as HTMLInputElement).value + ',';
    var txt = e.currentTarget.value;
    var data = String.fromCharCode(e.which);
    if (this.validarDataKeypress(data, txt)) {
      this.numComma = numComma;

      let arrayComma = this.numComma.split(',');
      this.numerosIngresados = arrayComma.map(cadena =>
        parseInt(cadena.trim(), 10)
      );
    }
  }

  keyPressEvent(e: any) {
    var txt = e.currentTarget.value;
    var data = String.fromCharCode(e.which);
    return this.validarDataKeypress(data, txt);
  }

  validarDataKeypress(data: any, txt: any) {
    var patronPunto = /^[0-9]+([.])?([0-9]+)?$/;
    // validamos solo numeros (numero ingresado), sino regresa false 
    if (txt.indexOf('-') > -1 && data == '-')
      return false;
    if (data != '-')
      if (!patronPunto.test("0" + data))
        return false;
    if (txt.indexOf('.') > -1 && data == ".")
      return false;
    return true;
  }

  calcularRepeticiones() {
    this.repeticiones.clear();
    this.numerosIngresados.forEach(numero => {
      if (!isNaN(numero)) {
        if (this.repeticiones.has(numero)) {
          this.repeticiones.set(numero, this.repeticiones.get(numero)! + 1);
        } else {
          this.repeticiones.set(numero, 1);
        }
      } else {
        console.log("NO TIENE NUMERO")
      }
    });
  }

  obtenerResultadosOrdenados() {
    this.calcularRepeticiones();
    return [...this.repeticiones.entries()].sort((a, b) => b[1] - a[1]);
  }


}
