import { useEffect, useState } from "react";
import styles from "./albumlist.module.css";
import Album from "../Album/Album";
import AlbumForm from "../AlbumForm/AlbumForm";
import ImageList from "../ImageList/ImageList";
import { db } from "../../firebaseInit";
import { collection, onSnapshot } from "firebase/firestore";

export default function AlbumList() {
	const [albumList, setAlbumList] = useState([]);
	const [showAlbumForm, setShowAlbumForm] = useState(false);
	const [openAlbum, setOpenAlbum] = useState({ albumId: "", open: false });
	useEffect(() => {
		const unsub = onSnapshot(collection(db, "album"), (snapShot) => {
			const card = snapShot.docs.map((doc) => {
				return {
					id: doc.id,
					...doc.data(),
				};
			});
			console.log(unsub);
			console.log(card);
			setAlbumList(card);
		});
	}, []);

	return (
		<>
			<div className={styles.mainContainer}>
				{!openAlbum.open ? (
					<>
						<div className={styles.albumForm}>
							{showAlbumForm && <AlbumForm />}
						</div>

						<div className={styles.header}>
							<span>Your albums</span>
							<button
								className={styles.btn}
								onClick={() => setShowAlbumForm(!showAlbumForm)}
								style={{
									color: !showAlbumForm ? "#07f" : "#ff1300",
									border: !showAlbumForm
										? "2px solid #07f"
										: "2px solid #ff1300",
									backgroundColor: !showAlbumForm
										? "rgba(0,119,255,.1)"
										: "rgba(255,19,0,.1)",
								}}
							>
								{!showAlbumForm ? "Add album" : "Cancel"}
							</button>
						</div>

						<div className={styles.albumContainer}>
							{albumList.map((card, i) => (
								<Album key={i} info={card} setOpenAlbum={setOpenAlbum} />
							))}
						</div>
					</>
				) : (
					<ImageList openAlbum={openAlbum} setOpenAlbum={setOpenAlbum} />
				)}
			</div>
		</>
	);
}
