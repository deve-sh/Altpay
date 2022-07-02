import create from "zustand";
import { persist } from "zustand/middleware";

const useUserAuth = create(
	persist(
		(set) => ({
			user: null,
			setUser: (updatedUser) => set(() => ({ user: updatedUser })),
		}),
		{ name: "alt-storage" }
	)
);

export default useUserAuth;
