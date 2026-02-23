import { useState, useEffect } from 'react';

interface Person {
  id: string;
  name: string;
  faceImageUrl: string;
}

const STORAGE_KEY = 'attendance_persons';

export function usePersonStorage() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    loadPersons();
  }, []);

  const loadPersons = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        setPersons(data);
      }
    } catch (error) {
      console.error('Failed to load persons:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addPerson = async (name: string, faceImageFile: File): Promise<boolean> => {
    try {
      setIsAdding(true);
      
      // Convert file to base64 data URL
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(faceImageFile);
      });
      
      const faceImageUrl = await base64Promise;
      
      const newPerson: Person = {
        id: `person_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name,
        faceImageUrl,
      };

      const updatedPersons = [...persons, newPerson];
      setPersons(updatedPersons);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPersons));

      return true;
    } catch (error) {
      console.error('Failed to add person:', error);
      return false;
    } finally {
      setIsAdding(false);
    }
  };

  return {
    persons,
    isLoading,
    isAdding,
    addPerson,
  };
}
