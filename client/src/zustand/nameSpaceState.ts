import { nameSpaceApi } from "@/services/apis/nameSpaceApi";
import { create } from "zustand";

type nameSpaceType = {
    loading: boolean;
    nameSpace: null|any[];
    getNameSpace: (Page:string|number)=> void;
    createNameSpace: (T:string, D:string)=> void;
    updateNameSpace: (T:string, D:string, NsId:string|number)=> void;
    deleteNameSpace: (NameSpaceId: string|number)=> void;
}

export const useNameSpace = create<nameSpaceType>((set)=>({
    loading:false, 
    nameSpace:[],
    getNameSpace: async(Page)=>{
      set({ loading:true });
      try {
        const nameSpaceData = await nameSpaceApi.getNameSpace(Page);
        console.log(nameSpaceData);
        console.log(nameSpaceData.data) 
        set({ nameSpace: nameSpaceData.data.data.nameSpaceData})
      } catch (error) {
       console.log(error);
      } finally {
        set({ loading:false});
      }
    },
    createNameSpace: async(nameSpaceTitle, nameSpaceDescription)=> {
       set({ loading: true}); 
       try {
           const res = await nameSpaceApi.createNameSpace(nameSpaceTitle, nameSpaceDescription);
           const createNameSpace = res.data.data.nameSpace;
           set((state)=>({
            nameSpace: [createNameSpace, ...(state.nameSpace || [])]
           }))
        } catch (error) {
           console.log(error); 
        } finally {
          set({ loading: false });
        }
    },
    updateNameSpace: async(nameSpaceTitle, nameSpaceDescription, nameSpaceId)=> {
       set({ loading: true}); 
       try {
           const res = await nameSpaceApi.editNameSpace(nameSpaceTitle, nameSpaceDescription, nameSpaceId);
           const updatedNameSpace = res.data.data.nameSpace;
           set((state) => ({
            nameSpace: (state.nameSpace || []).map((ns) =>
              ns.id === nameSpaceId ? updatedNameSpace : ns
            ),
          }));
        } catch (error) {
           console.log(error); 
        } finally {
          set({ loading: false });
        }
    },
    deleteNameSpace: async(nameSpaceId)=> {
       set({ loading: true}); 
       try {
          const res = await nameSpaceApi.deleteNameSpace(nameSpaceId);
          set((state) => ({
            nameSpace: (state.nameSpace || []).filter((ns) => ns.id !== nameSpaceId),
          }));   

        } catch (error) {
           console.log(error); 
        } finally {
          set({ loading: false });
        }
    }  
}))