<template>
  <div
    class="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-500"
    data-aos="fade-up"
    :data-aos-delay="delay"
  >
    <img :src="image" alt="Property" class="w-full h-64 object-cover" />
    <div class="p-6">
      <h4 class="text-xl font-semibold text-gray-800">{{ title }}</h4>
      <p class="text-gray-500">{{ location }}</p>
      <p class="text-amber-600 font-bold mt-2">{{ price }}</p>
      <button
        class="mt-4 bg-gray-800 text-white px-5 py-2 rounded-full hover:bg-gray-700 transition duration-300"
        @click="viewDetails"
      >
        Lihat Detail
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    location: String,
    price: String,
    image: String,
    delay: Number,
  },
  methods: {
    viewDetails() {
      alert(`Melihat detail untuk: ${this.title}`);
      // Ganti dengan logika navigasi atau API call
    },
  },
};
</script>
