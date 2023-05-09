import { Pipe, PipeTransform } from '@angular/core';
import { DegustSearchMethod } from './degust-search-method';

@Pipe({
  name: 'searchDegust'
})
export class SearchDegustPipe implements PipeTransform {

  transform(degustacion: {
    nombre: string,
    origen: string,
    decripcion: string,
    foto: string,
    media: number,
    tipoComida: string,
    fechaAlta: string,
    calificadorGusto: string
  }[], searchInput: string, searchMethod: DegustSearchMethod): {
    nombre: string,
    origen: string,
    decripcion: string,
    foto: string,
    media: number,
    tipoComida: string,
    fechaAlta: string,
    calificadorGusto: string
  }[] {
    if (searchInput == "")
      return degustacion

    searchInput = searchInput.toLowerCase()
    switch (searchMethod) {
      case DegustSearchMethod.nombre:
        return degustacion.filter(x => x.nombre.toLowerCase().includes(searchInput))
      case DegustSearchMethod.origen:
        return degustacion.filter(x => x.origen.toLowerCase().includes(searchInput))
      case DegustSearchMethod.calificadorGusto:
        return degustacion.filter(x => x.calificadorGusto.toLowerCase().includes(searchInput))
      case DegustSearchMethod.descripcion:
        return degustacion.filter(x => x.decripcion.toLowerCase().includes(searchInput))
      case DegustSearchMethod.tipoComida:
        return degustacion.filter(x => x.tipoComida.toLowerCase().includes(searchInput))

    }
  }

}
