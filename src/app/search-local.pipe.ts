import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchLocal'
})
export class SearchLocalPipe implements PipeTransform {

  transform(local: {
    nombre: string,
    direccion: string
  }[], searchInput: string): {
    nombre: string,
    direccion: string
  }[] {
    if (searchInput == "")
      return local
    searchInput = searchInput.toLowerCase()
    return local.filter(x => x.nombre.toLowerCase().includes(searchInput))
  }

}
