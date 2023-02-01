<template>

	<form @submit.prevent="uploadImage" enctype="multipart/form-data">
		<div class="modal-card" style="width: auto">
			<header class="modal-card-head">
				<p class="modal-card-title">Neue Datei hochladen</p>
				<button
					type="button"
					class="delete"
					@click="$emit('close')" />
			</header>
			<section class="modal-card-body">
				<b-field label="Name" :class="{ notuploading: uploading }">
					<b-input
						v-model="image.name"
						type="text"
						placeholder="MeinName"
						required>
					</b-input>
				</b-field>
				<b-field class="file is-primary" :class="{'has-name': !!image.file, notuploading: uploading }">
					<b-upload 
						v-model="image.file" 
						class="file-label" 
						:multiple="false"
						>
						<span class="file-cta">
							<b-icon class="file-icon" icon="upload"></b-icon>
							<span class="file-label">Datei auswählen und hochladen</span>
						</span>
						<span class="file-name" v-if="image.file">
							{{ image.file.name }}
						</span>
					</b-upload>
				</b-field>

				<div class="loadcontainer" :class="{ notuploading: !uploading }">
					<b-progress
					v-if="progress < 100"
					:value="progress"
					show-value
					format="percent"
					></b-progress>
					<b-progress v-if="progress == 100" show-value>Foto wird verarbeitet</b-progress>
				</div>

			</section>
			<footer class="modal-card-foot" v-html="infotext">
			</footer>
		</div>
	</form>

</template>

<script>
import apiaxios from "axios";
export default {
	props: ['model','allowedTypes','infotext'],
	data() {
		return {

			image: {
				name: '',
				file: null
			},
			error: false,
			message: "",
			uploading: false,
			progress: 0,

		}
	},

	watch: {
		"image.file": function (val) {
			//console.log(this.image.file.name)
		if (this.image.file.name) {
			this.uploadImage();
		}
		},
		
  	},

	methods: {
		validateError(file) {
			const MAX_SIZE = 32000000;
			const allowedTypes = this.allowedTypes;

			if (file.size > MAX_SIZE) {
				return `Höchstens ${MAX_SIZE / 1000000}MB. "${
				file.name
				}" hat ${Math.round(file.size / 1000000)}MB`;
			}

			if (!allowedTypes.includes(file.type)) {
				return `Das Foto muss im Format ${allowedTypes.join(", ")} sein`;
			}
		},

		async uploadImage() {
			//console.log(this.image.file)
			if (!this.validateError(this.image.file)) {
				try {
        			const tres = await apiaxios.post(this.$config.imageapi_url + '/login', this.$config.imageapi_login)
					this.uploading = true
					const axurl = this.$config.imageapi_url + "/upload"
					const config = {headers: {Authorization: "Bearer " + tres.data.accessToken}, onUploadProgress: (e) => (this.progress = Math.round((e.loaded * 100) / e.total))}
					const formData = new FormData();
					formData.append("serviceId", "taschenkalender" + this.model);
					formData.append("file", this.image.file);

					const imageres = await apiaxios.post(axurl, formData, config);
					console.log(imageres)
					const imagename = this.image.name || this.image.file.name.split(".")[0]
					const imageData = {name: imagename, img: imageres.data.file, width: imageres.data.width, height: imageres.data.height, is_active: 1, amount: imageres.data.pages}
					await this.$axios.$post(this.model + "s", imageData)

					this.message = `"${this.image.file}" wurde gespeichert`
					this.error = false
					this.uploading = false
					this.progress = 0
					this.$emit('close')
				
				} catch (err) {
					console.log(err);
					this.message = err.response.data.error;
					this.error = true;
					this.uploading = false;
					this.$buefy.toast.open({
						duration: 5000,
						position: "is-top-left",
						message: this.message,
						type: "is-danger",
					});
				}
				
			} else {
				this.$buefy.toast.open({
					duration: 3000,
					position: "is-top-left",
					message:
					this.validateError(this.image.file) +
					" und wird daher nicht gespeichert",
					type: "is-danger",
				});
			}










		this.image.name = '';
		this.image.file = false;
    },

	}
}
</script>

<style scoped lang="scss">
.notuploading {
  display: none;
}

.loadcontainer {
  height: 70px;
  position: relative;
  padding-top: 0px;

  .loadcontainer .notuploading {
    padding-top: 30px;
  }
}
</style>