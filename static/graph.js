const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');

const R = 100;  // Радиус для графика
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

const checkboxes = document.querySelectorAll(".checkR");

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            checkboxes.forEach(cb => {
                if (cb !== this) {
                    cb.checked = false;
                }
            });
        }
    });
});

// Очистка фона
ctx.clearRect(0, 0, canvas.width, canvas.height);


// Рисуем прямоугольник (верхний правый квадрант)
ctx.fillStyle = 'blue';
ctx.fillRect(centerX, centerY - R, R / 2, R);

// Рисуем треугольник (нижний правый квадрант)
ctx.beginPath();
ctx.moveTo(centerX, centerY);
ctx.lineTo(centerX + R / 2, centerY);
ctx.lineTo(centerX, centerY + R / 2);
ctx.closePath();
ctx.fill();

// Рисуем четверть круга (левый верхний квадрант)
ctx.beginPath();
ctx.moveTo(centerX, centerY);
ctx.arc(centerX, centerY, R / 2, Math.PI, 1.5 * Math.PI, false);
ctx.closePath();
ctx.fill();

// Рисуем оси
ctx.beginPath();
ctx.moveTo(centerX, 0);
ctx.lineTo(centerX, canvas.height);
ctx.moveTo(centerX, 0);
ctx.lineTo(centerX + 5, 5);
ctx.moveTo(centerX, 0);
ctx.lineTo(centerX - 5, 5);

ctx.moveTo(0, centerY);
ctx.lineTo(canvas.width, centerY);
ctx.moveTo(canvas.width, centerY);
ctx.lineTo(canvas.width - 5, centerY - 5)
ctx.moveTo(canvas.width, centerY);
ctx.lineTo(canvas.width - 5, centerY + 5)

ctx.strokeStyle = 'white';
ctx.stroke();


// Подписи осей и отметки
ctx.fillStyle = 'white';
ctx.font = '14px Arial';
ctx.fillText('R', centerX + R, centerY - 5);
ctx.fillText('R/2', centerX + R / 2, centerY - 5);
ctx.fillText('-R/2', centerX - R / 2, centerY - 5);
ctx.fillText('-R', centerX - R, centerY - 5);
ctx.fillText('x', canvas.width - 7, centerY - 10);

ctx.fillText('R', centerX + 5, centerY - R);
ctx.fillText('R/2', centerX + 5, centerY - R / 2);
ctx.fillText('-R/2', centerX + 5, centerY + R / 2);
ctx.fillText('-R', centerX + 5, centerY + R);
ctx.fillText('y', centerX + 10,  7);