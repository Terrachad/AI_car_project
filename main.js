const carCanvas = document.getElementById("carCanvas"); //get canvas by id let's pretend that it is a road
carCanvas.width = 300; 

const networkCanvas = document.getElementById("networkCanvas"); //get canvas by id let's pretend that it is a road
networkCanvas.width = 300; 

const carCtx = carCanvas.getContext("2d"); //canvas context more at the https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
const networkCtx = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width/2,carCanvas.width * 0.9);
const car = new Car(road.getLaneCenter(1),100,30,50,"AI");
const traffic = [
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",1.5),
    new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",1.5)

];



animate();

function animate(){
    for(let i = 0; i < traffic.length; i++){
        traffic[i].update(road.borders, []);
    }
    car.update(road.borders,traffic);

    carCanvas.height = window.innerHeight; //canvas have same hight as the window
    networkCanvas.height = window.innerHeight; //canvas have same hight as the window

    

    carCtx.save();
    carCtx.translate(0, -car.y + carCanvas.height*0.5);
    road.draw(carCtx);
    for(let i = 0; i < traffic.length; i++){
        traffic[i].draw(carCtx,"red");
    }
    car.draw(carCtx, "blue");

    carCtx.restore();

    Visualizer.drawNetwork(networkCtx, car.brain);
    requestAnimationFrame(animate);
}