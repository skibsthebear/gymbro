// Define the exercises array with all workout data
const exercises = [
    {
      name: 'Back Squat',
      sets: 3,
      reps: 8,
      rpe: 8,
      rest: '3-4 MIN',
      notes: 'Sit back and down, 15° flare, drive your knees out laterally.'
    },
    {
      name: 'Dumbbell Seated Shoulder Press',
      sets: 3,
      reps: 10,
      rpe: 8,
      rest: '3-4 MIN',
      notes: 'Bring the dumbbell all the way down to your shoulders, keep your torso upright.'
    },
    {
      name: 'Single-Arm Pulldown',
      sets: 3,
      reps: 12,
      rpe: 9,
      rest: '2-3 MIN',
      notes: 'Start with your non-dominant arm, match reps with dominant arm.'
    },
    {
      name: 'Barbell Hip Thrust',
      sets: 3,
      reps: 8,
      rpe: 9,
      rest: '2-3 MIN',
      notes: 'Tuck your chin and rib cage down, only move your hips. Use a pad.'
    },
    {
      name: 'Pec Deck',
      sets: 3,
      reps: 15,
      rpe: 9,
      rest: '1-2 MIN',
      notes: 'Nice stretch on the pecs at the bottom and full squeeze at the top control.'
    },
    {
      name: 'Reverse Pec Deck',
      sets: 3,
      reps: 15,
      rpe: 9,
      rest: '1-2 MIN',
      notes: 'Sweep the weight out and back, mind-muscle connection with rear delts.'
    },
    {
      name: 'Cable Lateral Raise',
      sets: 3,
      reps: 12,
      rpe: 9,
      rest: '1-2 MIN',
      notes: 'Lean away from the machine, arms straight out to your side.'
    }
  ];
  
  // Add exercise URL mapping at the top
  const exerciseLinks = {
    'Back Squat': 'https://www.muscleandstrength.com/exercises/squat.html',
    'Dumbbell Seated Shoulder Press': 'https://www.muscleandstrength.com/exercises/seated-dumbbell-press.html',
    'Single-Arm Pulldown': 'https://www.hevyapp.com/exercises/how-to-single-arm-lat-pulldown/',
    'Barbell Hip Thrust': 'https://www.muscleandstrength.com/exercises/barbell-hip-thrust',
    'Pec Deck': 'https://www.muscleandstrength.com/exercises/pec-dec.html',
    'Reverse Pec Deck': 'https://www.muscleandstrength.com/exercises/machine-reverse-fly',
    'Cable Lateral Raise': 'https://www.muscleandstrength.com/exercises/two-arm-cable-lateral-raise.html'
  };
  
  // Select the exercises container
  const exercisesContainer = document.querySelector('.exercises');
  
  // Dynamically generate exercise sections
  exercises.forEach((exercise, index) => {
    const exerciseDiv = document.createElement('div');
    exerciseDiv.id = `exercise-${index}`;
    exerciseDiv.classList.add('exercise');
    exerciseDiv.innerHTML = `
      <h3 class="exercise-section name">
        <a href="${exerciseLinks[exercise.name]}" target="_blank" title="Click to show guide">${exercise.name}</a>
      </h3>
      <div class="exercise-section">
        <span class="sets">Sets: ${exercise.sets}</span>
        <span class="reps">Reps: ${exercise.reps}</span>
        <span class="rpe">RPE: ${exercise.rpe}</span>
        <span class="rest">Rest: ${exercise.rest}</span>
      </div>
      <div class="exercise-section notes">
        <div class="notes-content">${exercise.notes}</div>
      </div>
      <input type="text" class="weight-input" placeholder="Weight (kg)">
      <div class="exercise-section tracking">
        <label class="set-checkbox">
          <input type="checkbox">
          <span>Set 1</span>
        </label>
        <label class="set-checkbox">
          <input type="checkbox">
          <span>Set 2</span>
        </label>
        <label class="set-checkbox">
          <input type="checkbox">
          <span>Set 3</span>
        </label>
      </div>
    `;
    exercisesContainer.appendChild(exerciseDiv);
  });

// Add after exercise generation code
function saveWeights() {
  document.querySelectorAll('.weight-input').forEach(input => {
    localStorage.setItem(`workoutWeights_${input.closest('.exercise').id}`, input.value);
  });
}

function loadWeights() {
  document.querySelectorAll('.weight-input').forEach(input => {
    const savedWeight = localStorage.getItem(`workoutWeights_${input.closest('.exercise').id}`);
    if (savedWeight) input.value = savedWeight;
  });
}

// Load saved weights when page loads
window.addEventListener('load', loadWeights);

// Save weights on input
document.addEventListener('input', (e) => {
  if (e.target.classList.contains('weight-input')) {
    saveWeights();
  }
});

// Modify existing beforeunload handler
window.addEventListener('beforeunload', (e) => {
  const hasUnsavedWeights = Array.from(document.querySelectorAll('.weight-input'))
    .some(input => input.value !== '');
  
  if (hasUnsavedWeights) {
    e.preventDefault();
    e.returnValue = 'You have unsaved weights and checkboxes! Data will be saved automatically.';
    saveWeights(); // One final save attempt
  }
});