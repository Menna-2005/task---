
const students = [
    { id: 1, name: "Ahmed", average: 85 },
    { id: 2, name: "Menna", average: 42 },
    { id: 3, name: "Ali", average: 90 },
    { id: 4, name: "Sara", average: 48 }
];

const studentsList = document.getElementById("studentsList");
const result = document.getElementById("result");

// عرض الطلاب
function displayStudents() {

    studentsList.innerHTML = "";

    students.forEach(student => {

        studentsList.innerHTML += `
            <div class="student">
                <h3>${student.name}</h3>
                <p>رقم الطالب: ${student.id}</p>
                <p>الدرجة: ${student.average}</p>
            </div>
        `;

    });
}

// إضافة طالب جديد
document.getElementById("studentForm")
.addEventListener("submit", function(e) {

    e.preventDefault();

    const id = Number(document.getElementById("studentId").value);
    const name = document.getElementById("studentName").value;
    const average = Number(document.getElementById("studentAverage").value);

    if (students.some(s => s.id === id)) {
        alert("رقم الطالب موجود بالفعل!");
        return;
    }

    students.push({ id, name, average });

    displayStudents();

    this.reset();

});

// حساب درجات الرأفة
document.getElementById("calculateBtn")
.addEventListener("click", function() {

    // تصنيف الطلاب المتعثرين
    const strugglingStudents = students.filter(
        s => s.average >= 40 && s.average < 50
    );

    // إضافة 5 درجات رأفة
    const upgradedGrades = strugglingStudents.map(
        s => s.average + 5
    );

    // جمع الدرجات
    const totalUpgraded = upgradedGrades.reduce(
        (sum, grade) => sum + grade, 0
    );

    // حساب المتوسط
    let upgradedAverage = 0;

    if (strugglingStudents.length > 0) {

        upgradedAverage =
        totalUpgraded / strugglingStudents.length;

    }

    // عرض النتائج
    result.innerHTML = `
        <div class="result-item">
            <h3>عدد الطلاب المتعثرين:</h3>
            <p>${strugglingStudents.length}</p>
        </div>

        <div class="result-item">
            <h3>الدرجات بعد الرأفة:</h3>
            ${upgradedGrades.map(grade =>
                `<p class="success">${grade}</p>`
            ).join("")}
        </div>

        <div class="result-item">
            <h3>متوسط الدرجات بعد الرأفة:</h3>
            <h2 class="success">${upgradedAverage.toFixed(2)}</h2>
        </div>
    `;

});

// عرض البيانات عند فتح الصفحة
displayStudents();
