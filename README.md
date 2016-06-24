# Radial-progress-bar

Эта JavaScript библиотека позволяет создовать радиальные прогресс бары на canvas.

## Пример
    
    var canvas = document.getElementById('paper');
    var ctx = canvas.getContext('2d');
	
    var bar = new RadialBar(ctx, {
      x: 500,
      y: 500,
      radius: 60,
      lineWidth: 4,
      lineFill: '#CCB566',
      backLineFill: '#FB6929',
      bgFill: '#F8FF8E',
      progress: 100,
      isShowInfoText: true,
      infoStyle: '30px Arial',
      infoColor: 'red'
    });
    
    // Update
    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      bar.add(0.1);
      bar.update();
      
      requestAnimationFrame(loop);
    }
    loop();


## Чтобы начать 

Чтобы создать новый прогресс бар

    var bar = new RadialBar(context, config);

* context - это полученный методом 'getContext('2d') контекст канваса.
* config - это объект с описанием конфигурация прогресс бара

## Свойства config

* x: позиция центра окружности по x координате
* y: позиция центра окружности по y координате
* radius: радиус окружности
* lineWidth: ширина линии окружности (прогресс бар)
* lineFill: цвет заливки линии окружности (прогресс бар)
* backLineFill: цвет задний заливки (за линией окружности)
* bgFill: цвет самого прогресс бара (центр окружности)
* progress: значение в процентах от 0 до 100, позволяет указать на сколько процентов нужно заполить прогресс бар
* isShowInfoText: показывать ли в центре прогресс в процентах (value %)
* infoStyle: позволяет указать стили для текста, как это делает свойство font в стандартном canvas API (например: '50px Arial')
* infoColor: позволяет указать цвет текста

## Методы RadialBar

* set(val) - устанавливает в прогресс баре значение val, где val число от 0 до 100
* add(val) - добавляет значение val в прогресс бар, где val число от 0 до 100
* subtract(val) - вычитает значение val в прогресс баре, где val число от 0 до 100
* update() - вызывается после вызова set, add и subtract, чтобы обновить значения визуально на холсте
* get() - возвращает строку типа 'value %', где value число от 0 до 100
* radians(deg) - возвращает радианы из значения deg, вычисляет так, deg * Math.PI/180

## Свойства RadialBar

* все свойства, которые возможно записать в config
* PERCENT_DEG - константа, которая ровняется 360/100 (1% от 360 грудусов)
* degProgress - количество градусов, вычисляется так, progress (% загрузки) * PERCENT_DEG
