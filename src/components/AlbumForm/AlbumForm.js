import { useRef } from "react";
import styles from "./albumform.module.css";
import { db } from "../../firebaseInit";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AlbumForm() {
	const nameRef = useRef();
	async function checkForDuplicateName(albumName) {
		const albumQuery = query(
			collection(db, "album"),
			where("Albumname", "==", albumName)
		);
		const snapshot = await getDocs(albumQuery);
		return !snapshot.empty;
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const albumName = nameRef.current.value;
		const isDuplicate = await checkForDuplicateName(albumName);

		if (isDuplicate) {
			toast.error("Album name already in use.");
		} else {
			const docRef = await addDoc(collection(db, "album"), {
				Albumname: albumName,
				imageList: [],
			});
			console.log(docRef);

			toast.success("Album added successfully");
			nameRef.current.value = "";
			nameRef.current.focus();
		}
	}
	function clearForm(e) {
		e.preventDefault();
		nameRef.current.value = "";
		nameRef.current.focus();
	}

	return (
		<>
			<ToastContainer />
			<div className={styles.formContainer}>
				<h1>Create an album</h1>

				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Album Name"
						ref={nameRef}
						required
						className={styles.input}
					/>
					<button
						className={` ${styles.formBtn} ${styles.clearBtn}`}
						onClick={clearForm}
					>
						Clear
					</button>
					<button className={` ${styles.formBtn} ${styles.createBtn}`}>
						Create
					</button>
				</form>
			</div>
		</>
	);
}
