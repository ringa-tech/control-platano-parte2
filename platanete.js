/**
 * Esta clase representa un objeto en pantalla.
 * Por ejemplo si tenemos un platano y una pelota, tenemos dos objetos "Platanete"
 */
class Platanete {
	//Arreglo que tiene los 10, 100 o 1000 pixeles amarillos que representan este objeto o "Platanete".
	//Este en sig. videos lo quitaremos :)
	pixeles = [];

	//Posiciones de la esquina super izquierda (xMinima/yMinima) e inferior derecha (xMaxima/yMaxima)
	xMinima = 0;
	xMaxima = 0;
	yMinima = 0;
	yMaxima = 0;

	constructor(x, y) {
		//Al crear el Platanete con un primer pixel, lo agregamos y las esquinas son representadas por ese pixel
		this.agregarPixel(x, y);
		this.xMinima = x;
		this.xMaxima = x;
		this.yMinima = y;
		this.yMaxima = y;
	}

	agregarPixel(x, y) {
		//Agregar el pixel al arreglo y ver si las X y Y recibidas modifican nuestras esquinas
		this.pixeles.push( {x: x, y: y} );

		if (x < this.xMinima) {
			this.xMinima = x;
		}
		if (x > this.xMaxima) {
			this.xMaxima = x;
		}

		//modo guapo
		this.yMinima = y < this.yMinima ? y : this.yMinima;
		this.yMaxima = y > this.yMaxima ? y : this.yMaxima;
	}

	/**
	 * Regresa verdadero si el pixel enviado esta cerca de este objeto "Platanete", en cuyo caso
	 * deberia agregarlo a este objeto. Si no esta cerca, debe tratarse de otro objeto amarillo en pantalla
	 */
	estaCerca(x, y) {
		//Revisar si esta dentro del rectangulo
		if (x >= this.xMinima && x <= this.xMaxima &&
			y >= this.yMinima && y <= this.yMaxima) {

			return true;
		}

		//Tomar la distancia en X y en Y hacia los ejes mas cercanos.
		//Sumamos esas distancias, y comparamos si es menor a algun numero (e.g. 50)
		var distX = 0;
		var distY = 0;

		if (x < this.xMinima) {
			distX = this.xMinima - x;
		}
		if (x > this.xMaxima) {
			distX = x - this.xMaxima;
		}
		if (y < this.yMinima) {
			distY = this.yMinima - y;
		}
		if (y > this.yMaxima) {
			distY = y - this.yMaxima;
		}

		var distancia = distX + distY;

		return distancia < 50;
	}

	dibujar(ctx) {
		//Dibujar el rectangulo (representado por las esquinas que tenemos en las variables) en el contexto de un canvas
		ctx.strokeStyle="#f00";
		ctx.lineWidth = 4;
		ctx.beginPath();
		var x = this.xMinima;
		var y = this.yMinima;
		var width = this.xMaxima - this.xMinima;
		var height = this.yMaxima - this.yMinima;

		ctx.rect(x, y, width, height);
		ctx.stroke();
	}
}