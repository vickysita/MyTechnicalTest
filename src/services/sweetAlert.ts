import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

export class SweelAlertService {
  alertAlerta(title: string, text: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'success',
      confirmButtonText: 'Cool',
      timer: 1500
    })

  }

  alertAlertOk(title: string, text: string, footer: string = '') {
    return Swal.fire({
      icon: 'warning',
      title: title,
      text: text,
      footer: footer,
      customClass: {
        popup: 'popup-class',
      },
    })
  }
  alertConfirmDelete(title: string, text: string, TituloMsjConfirmacion: string = 'Eliminado', textoMsjConfirmacion: string = 'se ha eliminado correctamente') {
    return Swal.fire({
      title: title,
      text: text,
      width: 400,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      customClass: {
        popup: 'popup-class',
      },
    })

  }

  alertConfirmGuardar2(title: string, text: string, footer: string) {
    return Swal.fire({
      title: title,
      text: text,
      footer: footer,
      width: 400,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      customClass: {
        popup: 'popup-class',
      },
    })

  }
  alertError(title: string, text: string, footer: string = '') {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
      footer: footer,
      customClass: {
        popup: 'popup-class',
      },
    })
  }
  alertConfirm(title: string, text: string, TituloMsjConfirmacion: string = '', textoMsjConfirmacion: string = '') {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      customClass: {
        popup: 'popup-class',
      },
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          TituloMsjConfirmacion,
          textoMsjConfirmacion,
          'success'
        )
      }
    })
  }
  alertSuccessConfirm(title: string, text: string) {
    return Swal.fire({
      title: title,
      text: text,
      width: 400,
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      customClass: {
        popup: 'popup-class',
      },
    })

  }
  alertInfoConfirm(title: string, text: string) {
    return Swal.fire({
      title: title,
      text: text,
      width: 400,
      icon: 'info',
      showCancelButton: true,
      denyButtonText: "que",
      denyButtonColor: "#d33",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      customClass: {
        popup: 'popup-class',
      },
    })

  }
  alertWarningConfirm(title: string, text: string, clickPorFuera: boolean = false) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: clickPorFuera,
      allowEscapeKey: false,
      allowEnterKey: false,
      confirmButtonColor: '#daa000',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      denyButtonText: "jeje",
      denyButtonColor: "#d33",
      customClass: {
        popup: 'popup-class',
      },
    }).then((result) => {
      return result;
    })
  }
  alertinfoConfirm(title: string, text: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'info',
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      confirmButtonColor: '#daa000',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Generar Otra',
      cancelButtonText: 'Cargar Existente',
      customClass: {
        popup: 'popup-class',
      },
    }).then((result) => {
      return result;
    })
  }
  alertWarning(title: string, text: string, footer: string = '') {
    return Swal.fire({
      icon: 'warning',
      title: title,
      text: text,
      footer: footer,
      customClass: {
        popup: 'popup-class',
      },
    })
  }
  alertSuccess(title: string, text: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'success',
      customClass: {
        popup: 'popup-class',
      },
    });
  }

  alertSuccessFooter(title: string, text: string, footer: string) {
    return Swal.fire({
      title: title,
      text: text,
      footer: footer,
      icon: 'success',
      customClass: {
        popup: 'popup-class',
      },
    });
  }

  alertInfo(title: string, text: string, footeText: string = '') {
    return Swal.fire({
      title: title,
      text: text,
      footer: footeText,
      icon: 'info',
      customClass: {
        popup: 'popup-class',
      },
    });
  }

  alertConfirmConGuardadoUnidades(title: string, text: string): Observable<any> {
    let resultV: any = { resp: false };
    return resultV;
  }
  alertaConPregunta(title: string) {
    return Swal.fire({
      title: title,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading()
    });
  }
  alertConfirmGuardar(title: string, text: string, TituloMsjConfirmacion: string = '', textoMsjConfirmacion: string = '') {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'popup-class',
      },
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          TituloMsjConfirmacion,
          textoMsjConfirmacion,
          'success'
        )
      }
    })
  }

  alertWarningRequired(title: string, text: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      customClass: {
        popup: 'popup-class',
      },
    });
  }

} 