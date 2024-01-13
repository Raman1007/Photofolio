import { useEffect, useRef } from "react";
import styles from "./imageForm.module.css";
import { db } from "../../firebaseInit";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ImageForm(props) {
	const { albumId, updateImage, setUpdateImage, setShowImageForm } = props;
	const imageNameRef = useRef();
	const imageUrlRef = useRef();

	useEffect(() => {
		if (updateImage) {
			imageNameRef.current.value = updateImage.name;
			imageUrlRef.current.value = updateImage.link;
		}
	}, [updateImage]);

	function clearForm() {
		imageNameRef.current.value = null;
		imageUrlRef.current.value = null;
		imageNameRef.current.focus();
	}

	async function handleUpdateSubmit(e) {
		e.preventDefault();
		const oldData = {
			name: updateImage.name,
			link: updateImage.link,
		};

		const newData = {
			name: imageNameRef.current.value,
			link: imageUrlRef.current.value,
		};

		const albumRef = doc(db, "album", albumId);
		updateDoc(albumRef, {
			imageList: arrayUnion(newData),
		});

		updateDoc(albumRef, {
			imageList: arrayRemove(oldData),
		});

		toast.success(" Image Updated !");
		setUpdateImage(null);
		setShowImageForm(false);
		clearForm();
	}

	async function handleSubmit(e) {
		e.preventDefault();

		const data = {
			name: imageNameRef.current.value,
			link: imageUrlRef.current.value,
		};

		const albumRef = doc(db, "album", albumId);
		await updateDoc(albumRef, {
			imageList: arrayUnion(data),
		});

		toast.success("New Image Added to your Album!");
		clearForm();
	}

	return (
		<>
			<ToastContainer />
			<div className={styles.formContainer}>
				<h1>{!updateImage ? "Add an Image" : "Update Image"}</h1>
				<form onSubmit={updateImage ? handleUpdateSubmit : handleSubmit}>
					<input
						type="text"
						className={styles.inputBox}
						placeholder="Title"
						ref={imageNameRef}
						required
					/>
					<input
						type="text"
						className={styles.inputBox}
						placeholder="Image URL"
						ref={imageUrlRef}
						required
					/>
					<br />
					<div className={styles.btnImageAdd}>
						<button className={styles.add}>
							{!updateImage ? "Add" : "Update"}
						</button>
						<button className={styles.clear} onClick={clearForm}>
							Clear
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
