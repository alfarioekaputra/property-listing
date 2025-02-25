<script setup lang="ts">
import { defineProps, ref } from 'vue';

export interface Props {
  data: Property;
}

const props = defineProps<Props>();
const modal = ref<string>('');

const formData = ref({
  title: props.data.title,
  name: '',
  email: '',
  phone: '',
  message: '',
});

// Fungsi untuk reset form
const resetForm = () => {
  formData.value = { title: props.data.title, name: '', email: '', phone: '', message: '' };
};

const classMessage = ref("");
const responseMessage = ref("");

const handleSubmit = async () => {
  try {
    const response = await fetch("/api/consumerInquiry", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData.value),
    });

    const result = await response.json();
    classMessage.value = "text-green-600";
    responseMessage.value = result.message;
    resetForm();
    setTimeout(() => modal.value = '', 5000);
  } catch (error) {
    classMessage.value = "text-red-600";
    responseMessage.value = "Terjadi kesalahan, coba lagi.";
    resetForm();
    setTimeout(() => modal.value = '', 5000);
  }
}

const openModal = () => {
  modal.value = 'modal-open';
};

const closeModal = () => {
  modal.value = '';
};

</script>

<template>
  <div>
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-6">
        <!-- Gambar Utama -->
        <div class="relative mb-8" data-aos="fade-up">
          <img :src="props.data.image" :alt="props.data.title" class="w-full h-[500px] object-cover rounded-lg shadow-lg" />
        </div>

        <!-- Judul dan Harga -->
        <div class="flex justify-between items-center mb-6" data-aos="fade-up" data-aos-delay="200">
          <h1 class="text-4xl text-gray-800">
            {{ props.data.title }}
          </h1>
          <p class="text-amber-600 font-bold text-2xl">
            {{ props.data.price }}
          </p>
        </div>

        <!-- Lokasi -->
        <p class="text-gray-500 text-lg mb-6" data-aos="fade-up" data-aos-delay="300">
          Lokasi: {{ props.data.location }}
        </p>

        <!-- Deskripsi -->
        <div class="mb-10" data-aos="fade-up" data-aos-delay="400">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">
            Deskripsi
          </h2>
          <p class="text-gray-600 leading-relaxed">
            {{ props.data.description }}
          </p>
        </div>

        <!-- Fitur Properti -->
        <div class="mb-10" data-aos="fade-up" data-aos-delay="500">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">
            Fitur Properti
          </h2>
          <ul class="grid grid-cols-2 gap-4 text-gray-600">
            <li>
              <span class="font-semibold">Kamar Tidur:</span>
              {{ props.data.features.bedrooms }}
            </li>
            <li>
              <span class="font-semibold">Kamar Mandi:</span>
              {{ props.data.features.bathrooms }}
            </li>
            <li>
              <span class="font-semibold">Luas Area:</span>
              {{ props.data.features.area }}
            </li>
            <li>
              <span class="font-semibold">Garasi:</span>
              {{ props.data.features.garage }}
            </li>
          </ul>
        </div>

        <!-- Gambar Tambahan -->
        <div class="mb-10" data-aos="fade-up" data-aos-delay="600">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">
            Galeri Properti
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img
              v-for="(img, index) in props.data.additionalImages"
              :key="index"
              :src="img"
              :alt="`Galeri ${props.data.title} ${index + 1}`"
              class="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>

        <!-- Tombol Aksi -->
        <div class="text-center" data-aos="fade-up" data-aos-delay="300">
          <button @click="openModal" class="bg-amber-500 text-white px-8 py-3 rounded-full hover:bg-amber-600 transition duration-300 mr-4">
            Hubungi Agen
          </button>
          <a href="/#properties" class="text-amber-500 hover:underline">Kembali</a>
        </div>
      </div>
    </section>

    <!-- Modal Form -->
    <dialog class="modal" :class="modal">
      <div class="modal-box">
        <h2 class="text-2xl font-serif text-white mb-6">
          Hubungi Agen
        </h2>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <input v-model="formData.title" type="hidden" name="title" />
          <input v-model="formData.name" type="text" name="name" placeholder="Nama Anda" class="w-full p-4 rounded-full border border-gray-300 focus:outline-none focus:border-amber-500" required />
          <input v-model="formData.email" type="email" name="email" placeholder="Email Anda" class="w-full p-4 rounded-full border border-gray-300 focus:outline-none focus:border-amber-500" required />
          <input v-model="formData.phone" type="tel" name="phone" placeholder="Nomor Telepon" class="w-full p-4 rounded-full border border-gray-300 focus:outline-none focus:border-amber-500" required />
          <textarea v-model="formData.message" name="message" placeholder="Pesan Anda" class="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:border-amber-500" rows="4"></textarea>
          <div class="flex justify-end space-x-4">
            <!-- if there is a button in form, it will close the modal -->
            <button @click="closeModal" type="button" class="btn text-gray-600 hover:text-gray-800">
              Batal
            </button>

            <button type="submit"
              class="bg-amber-500 text-white px-6 py-2 rounded-full hover:bg-amber-600 transition duration-300">
              Kirim
            </button>
          </div>
        </form>
        <p v-if="responseMessage" class="mt-4 text-center" :class="classMessage">{{ responseMessage }}</p>
      </div>
    </dialog>
  </div>
</template>