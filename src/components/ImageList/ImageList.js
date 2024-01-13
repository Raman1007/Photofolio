import { useEffect, useState } from "react";
import ImageForm from "../ImageForm/ImageForm";
import Image from "../Image/Image";
import styles from "./imageList.module.css";
import { db } from "../../firebaseInit";
import { doc, updateDoc, arrayRemove, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ImageList(props) {
	const { openAlbum, setOpenAlbum } = props;
	const [showImageForm, setShowImageForm] = useState(false);
	const [updateImage, setUpdateImage] = useState(null);
	const [imageList, setImageList] = useState([]);
	const [search, setSearch] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);

	function handleBackClick(e) {
		e.preventDefault();
		setOpenAlbum({ albumId: "", show: false });
	}

	useEffect(() => {
		const unsub = onSnapshot(doc(db, "album", openAlbum.albumId), (doc) => {
			const data = doc.data().imageList;
			setImageList(data);
			console.log(unsub);
		});
	}, [openAlbum.albumId]);

	async function handleImageDelete(image) {
		const albumRef = doc(db, "album", openAlbum.albumId);
		await updateDoc(albumRef, {
			imageList: arrayRemove(image),
		});
		toast.success("Image Successfully Deleted");
	}

	function handleImageEdit(image) {
		setUpdateImage(image);
		setShowImageForm(true);
	}

	const openLightbox = (index) => {
		setCurrentImageIndex(index);
		setIsOpen(true);
	};

	const closeLightbox = () => {
		setIsOpen(false);
	};

	const handleSearchIconClick = () => {
		setIsSearchInputVisible(true);
	};

	const handleClearIconClick = () => {
		setIsSearchInputVisible(false);
		setSearch("");
	};

	return (
		<>
			<ToastContainer />
			<div className={styles.btnContainer}>
				<span className={`${styles.backBtn}`} onClick={handleBackClick}>
					<img
						className={styles.image}
						src="https://stalwart-wisp-382f3c.netlify.app/assets/back.png"
						alt="back"
					></img>
				</span>

				<div className={styles.imageSearch}>
					{isSearchInputVisible ? null : (
						<img
							src="https://stalwart-wisp-382f3c.netlify.app/assets/search.png"
							alt="search"
							onClick={handleSearchIconClick}
							style={{ width: "30px", cursor: "pointer", marginRight: "25px" }}
						/>
					)}
					{isSearchInputVisible && (
						<>
							<input
								type="text"
								placeholder="Search..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<img
								src="https://stalwart-wisp-382f3c.netlify.app/assets/clear.png"
								alt="clear"
								onClick={handleClearIconClick}
								style={{ width: "30px", cursor: "pointer", marginLeft: "83px" }}
							/>
						</>
					)}
				</div>

				<button
					className={`${styles.btn} ${styles.addBtn}`}
					onClick={() => setShowImageForm(!showImageForm)}
				>
					{!showImageForm ? "Add image" : "Cancel"}
				</button>
			</div>

			<div style={{ textAlign: "center" }}>
				{showImageForm && (
					<ImageForm
						albumId={openAlbum.albumId}
						updateImage={updateImage}
						setUpdateImage={setUpdateImage}
						setShowImageForm={setShowImageForm}
					/>
				)}
				<h1>
					{imageList.length !== 0
						? "Your Collections"
						: "No Images in Your Collection"}
				</h1>
			</div>

			<div className={styles.imageList}>
				{imageList
					.filter((image) => {
						return search.toLocaleLowerCase() === ""
							? image
							: image.name.toLocaleLowerCase().includes(search);
					})
					.map((image, i) => (
						<Image
							image={image}
							key={i}
							index={i}
							handleImageEdit={handleImageEdit}
							handleImageDelete={handleImageDelete}
							openLightbox={openLightbox}
						/>
					))}
			</div>

			{isOpen && (
				<div className={styles.imageContainer}>
					<button className={styles.closebutton} onClick={closeLightbox}>
						X
					</button>
					<img
						style={{ width: "35%" }}
						className={styles.setImage}
						src={imageList[currentImageIndex].link}
						alt={`${currentImageIndex}`}
					/>
				</div>
			)}
		</>
	);
}
