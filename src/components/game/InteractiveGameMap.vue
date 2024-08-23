<template>
  <div class="interactive-game-map">
      <div class="map-navigation">
          <button @click="zoomOut" :disabled="currentLevel === 'world'">Zoom Out</button>
          <span>{{ currentLevel }} > {{ currentArea }}</span>
      </div>
      <div class="map-container">
          <svg width="800" height="600" @click="handleMapClick">
              <g v-if="currentLevel === 'world'">
                  <!-- World map with 4 islands -->
                  <rect
                      v-for="island in islands"
                      :key="island.id"
                      :x="island.x"
                      :y="island.y"
                      :width="200"
                      :height="150"
                      :fill="island.color"
                      @click.stop="selectIsland(island)"
                  />
              </g>
              <g v-else-if="currentLevel === 'island'">
                  <!-- Island map with 9 plots -->
                  <rect
                      v-for="plot in plots"
                      :key="plot.id"
                      :x="plot.x"
                      :y="plot.y"
                      :width="100"
                      :height="100"
                      :fill="plot.color"
                      @click.stop="selectPlot(plot)"
                  />
              </g>
              <g v-else-if="currentLevel === 'plot'">
                  <!-- Plot map with foraging patches -->
                  <circle
                      v-for="patch in patches"
                      :key="patch.id"
                      :cx="patch.x"
                      :cy="patch.y"
                      r="20"
                      :fill="patch.color"
                      @click.stop="selectPatch(patch)"
                  />
              </g>
              <!-- Pins for notes -->
              <g v-for="note in visibleNotes" :key="note.id">
                  <text :x="note.x" :y="note.y" font-family="Arial" font-size="20" fill="red">📌</text>
              </g>
          </svg>
      </div>
      <div class="map-sidebar">
          <h3>{{ currentArea }} Details</h3>
          <button @click="addNote">Add Note</button>
          <button @click="viewNotes">View Notes</button>
          <div v-if="selectedNote">
              <h4>Selected Note</h4>
              <p>{{ selectedNote.content }}</p>
              <p>By: {{ selectedNote.author }}</p>
          </div>
      </div>
      <!-- Modal for adding/viewing notes -->
      <div v-if="showModal" class="modal">
          <div class="modal-content">
              <h3>{{ isViewingNotes ? 'Notes for ' + currentArea : 'Add Note' }}</h3>
              <textarea v-if="!isViewingNotes" v-model="newNote" placeholder="Enter your note here"></textarea>
              <ul v-else>
                  <li v-for="note in currentAreaNotes" :key="note.id" @click="selectNote(note)">
                      {{ note.content.substring(0, 50) }}...
                  </li>
              </ul>
              <button v-if="!isViewingNotes" @click="saveNote">Save Note</button>
              <button @click="closeModal">Close</button>
          </div>
      </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const currentLevel = ref('world')
const currentArea = ref('World Map')
const showModal = ref(false)
const isViewingNotes = ref(false)
const newNote = ref('')
const selectedNote = ref(null)

// Mock data - replace with actual data from your game
const islands = [
  { id: 1, name: 'Growth Island', x: 50, y: 50, color: '#a5d6a7' },
  { id: 2, name: 'Stability Island', x: 300, y: 50, color: '#90caf9' },
  { id: 3, name: 'Shadow Island', x: 50, y: 300, color: '#b39ddb' },
  { id: 4, name: 'Light Island', x: 300, y: 300, color: '#fff59d' },
]

const plots = computed(() => {
  // Generate 9 plots for the current island
  return Array.from({ length: 9 }, (_, i) => ({
      id: i + 1,
      name: `Plot ${i + 1}`,
      x: (i % 3) * 150 + 50,
      y: Math.floor(i / 3) * 150 + 50,
      color: `hsl(${Math.random() * 360}, 70%, 80%)`,
  }))
})

const patches = computed(() => {
  // Generate 5 patches for the current plot
  return Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      name: `Patch ${i + 1}`,
      x: Math.random() * 700 + 50,
      y: Math.random() * 500 + 50,
      color: `hsl(${Math.random() * 360}, 70%, 80%)`,
  }))
})

const notes = computed(() => store.state.mapNotes || [])

const visibleNotes = computed(() => {
  return notes.value.filter((note) => note.level === currentLevel.value && note.areaId === currentArea.value.id)
})

const currentAreaNotes = computed(() => {
  return notes.value.filter((note) => note.level === currentLevel.value && note.areaId === currentArea.value.id)
})

const selectIsland = (island) => {
  currentLevel.value = 'island'
  currentArea.value = island.island_name
}

const selectPlot = (plot) => {
  currentLevel.value = 'plot'
  currentArea.value = plot.plot_id
}

const selectPatch = (patch_id) => {
  // You might want to show detailed information about the patch here
  console.log('Selected patch:', patch_id)
}

const zoomOut = () => {
  if (currentLevel.value === 'plot') {
      currentLevel.value = 'island'
      currentArea.value = 'Island Map'
  } else if (currentLevel.value === 'island') {
      currentLevel.value = 'world'
      currentArea.value = 'World Map'
  }
}

const handleMapClick = (event) => {
  const rect = event.target.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  console.log(`Clicked at (${x}, ${y})`)
}

const addNote = () => {
  showModal.value = true
  isViewingNotes.value = false
}

const viewNotes = () => {
  showModal.value = true
  isViewingNotes.value = true
}

const saveNote = () => {
  if (newNote.value.trim()) {
      store.dispatch('addMapNote', {
          level: currentLevel.value,
          areaId: currentArea.value.id,
          content: newNote.value,
          x: Math.random() * 800, // Replace with actual coordinates
          y: Math.random() * 600,
          author: store.state.currentUser.name,
      })
      newNote.value = ''
      closeModal()
  }
}

const selectNote = (note) => {
  selectedNote.value = note
}

const closeModal = () => {
  showModal.value = false
  selectedNote.value = null
}
</script>

<style scoped>
.interactive-game-map {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 800px;
  border: 1px solid #ccc;
}

.map-navigation {
  padding: 10px;
  background-color: #f0f0f0;
}

.map-container {
  flex-grow: 1;
  position: relative;
}

.map-sidebar {
  width: 200px;
  padding: 10px;
  background-color: #f0f0f0;
  position: absolute;
  right: 0;
  top: 40px;
  bottom: 0;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
}

textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
}

button {
  margin-right: 10px;
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  cursor: pointer;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}

li:hover {
  background-color: #f0f0f0;
}
</style>
