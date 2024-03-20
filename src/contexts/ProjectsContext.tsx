"use client"

import { createContext, useContext, useState, useEffect } from 'react';
import { getAllProjects } from '@/lib/api';

type ProjectData = {
    id: string;
    slug: string;
    acf: {
      progetto_header_background_image: string;
      progetto_anno_text: string;
      progetto_categoria: string[];
      progetto_title: string;
    };
  };

type ProjectsContextType = {
    projects2: ProjectData[];
    loading2: boolean;
};

const ProjectsContext = createContext<ProjectsContextType>({
    projects2: [],
    loading2: true,
});

export const ProjectsProvider = ({ children }: { children: React.ReactNode }) => {

    const [projects2, setProjects2] = useState<ProjectData[]>([]);
    const [loading2, setLoading2] = useState(true);

    useEffect(() => {
        const fetchProjects = () => {    
            console.log("Fetching projects..."); // Add this line
            getAllProjects().then(allProjects => {
                console.log("contest progetti res: ", allProjects);
                setProjects2(allProjects);
                setLoading2(false); // Set loading to false when the data has been fetched
            }).catch(error => {
                console.error("Failed to fetch projects: ", error);
            });
        };
    
        fetchProjects();
    }, []);

    return (
        <ProjectsContext.Provider value={{ projects2, loading2 }}>
            {children}
        </ProjectsContext.Provider>
    );
};

export const useProjects = () => useContext(ProjectsContext);