// src/services/example.service.ts
import api from '@/utils/Global/axios';

export interface ExampleData {
  id: number;
  name: string;
  // Agrega más campos según tu API
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

class ExampleService {
  /**
   * Obtener todos los elementos
   */
  async getAll(): Promise<ApiResponse<ExampleData[]>> {
    try {
      const response = await api.get<ApiResponse<ExampleData[]>>('/examples');
      return response.data;
    } catch (error) {
      console.error('Error al obtener elementos:', error);
      throw error;
    }
  }

  /**
   * Obtener un elemento por ID
   */
  async getById(id: number): Promise<ApiResponse<ExampleData>> {
    try {
      const response = await api.get<ApiResponse<ExampleData>>(`/examples/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener elemento ${id}:`, error);
      throw error;
    }
  }

  /**
   * Crear un nuevo elemento
   */
  async create(data: Partial<ExampleData>): Promise<ApiResponse<ExampleData>> {
    try {
      const response = await api.post<ApiResponse<ExampleData>>('/examples', data);
      return response.data;
    } catch (error) {
      console.error('Error al crear elemento:', error);
      throw error;
    }
  }

  /**
   * Actualizar un elemento existente
   */
  async update(id: number, data: Partial<ExampleData>): Promise<ApiResponse<ExampleData>> {
    try {
      const response = await api.put<ApiResponse<ExampleData>>(`/examples/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar elemento ${id}:`, error);
      throw error;
    }
  }

  /**
   * Eliminar un elemento
   */
  async delete(id: number): Promise<ApiResponse<null>> {
    try {
      const response = await api.delete<ApiResponse<null>>(`/examples/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar elemento ${id}:`, error);
      throw error;
    }
  }
}

export default new ExampleService();
