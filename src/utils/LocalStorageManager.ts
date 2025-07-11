/**
 * Manages localStorage operations with a namespaced parent key.
 * Provides methods for storing, retrieving, updating, and deleting data in localStorage.
 * @class
 */
export default class LocalStorageManager {
  private parentKey: string;
  private isSupported: boolean;

  /**
   * Creates an instance of LocalStorageManager.
   * @param {string} parentKey - The parent key used as a namespace in localStorage.
   * @throws {Error} If parentKey is empty or not a string.
   */
  constructor(parentKey: string) {
    if (typeof parentKey !== 'string' || parentKey.trim() === '') {
      throw new Error('Parent key must be a non-empty string');
    }
    this.parentKey = parentKey.trim();
    this.isSupported = this.checkLocalStorageSupport();
    this.init();
  }

  /**
   * Checks if localStorage is supported in the current environment.
   * @private
   * @returns {boolean} True if localStorage is supported, false otherwise.
   */
  private checkLocalStorageSupport(): boolean {
    try {
      const testKey = '__test__';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      console.warn('localStorage is not supported in this environment');
      return false;
    }
  }

  /**
   * Initializes the parent key in localStorage with an empty object if it doesn't exist.
   * @private
   */
  private init(): void {
    if (!this.isSupported) return;

    try {
      const storedData = window.localStorage.getItem(this.parentKey);
      if (!storedData) {
        window.localStorage.setItem(this.parentKey, JSON.stringify({}));
      }
    } catch (error) {
      console.error(`Failed to initialize localStorage with parent key ${this.parentKey}:`, error);
    }
  }

  /**
   * Retrieves the entire data object stored under the parent key.
   * @private
   * @returns {Record<string, any>} The parsed data object.
   * @throws {Error} If data cannot be parsed or localStorage is not supported.
   */
  private getData(): Record<string, any> {
    if (!this.isSupported) {
      throw new Error('localStorage is not supported');
    }

    try {
      const data = window.localStorage.getItem(this.parentKey);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      throw new Error(`Failed to parse localStorage data for ${this.parentKey}: ${error}`);
    }
  }

  /**
   * Saves data to localStorage under the parent key.
   * @private
   * @param {Record<string, any>} data - The data object to save.
   * @throws {Error} If data cannot be saved or localStorage is not supported.
   */
  private saveData(data: Record<string, any>): void {
    if (!this.isSupported) {
      throw new Error('localStorage is not supported');
    }

    try {
      window.localStorage.setItem(this.parentKey, JSON.stringify(data));
    } catch (error) {
      throw new Error(`Failed to save data to localStorage: ${error}`);
    }
  }

  /**
   * Sets a value for a specific key under the parent key.
   * @param {string} key - The key to store the value under.
   * @param {any} value - The value to store.
   * @returns {boolean} True if the operation was successful, false otherwise.
   */
  public setItem(key: string, value: any): boolean {
    if (typeof key !== 'string' || key.trim() === '') {
      console.error('Key must be a non-empty string');
      return false;
    }

    try {
      const data = this.getData();
      data[key.trim()] = value;
      this.saveData(data);
      return true;
    } catch (error) {
      console.error(`Failed to set item for key ${key}:`, error);
      return false;
    }
  }

  /**
   * Retrieves a value for a specific key under the parent key.
   * @param {string} key - The key to retrieve the value for.
   * @returns {any | null} The value associated with the key, or null if not found.
   */
  public getItem(key: string): any | null {
    if (typeof key !== 'string' || key.trim() === '') {
      console.error('Key must be a non-empty string');
      return null;
    }

    try {
      const data = this.getData();
      return key in data ? data[key] : null;
    } catch (error) {
      console.error(`Failed to get item for key ${key}:`, error);
      return null;
    }
  }

  /**
   * Removes a specific key from the data under the parent key.
   * @param {string} key - The key to remove.
   * @returns {boolean} True if the operation was successful, false otherwise.
   */
  public removeItem(key: string): boolean {
    if (typeof key !== 'string' || key.trim() === '') {
      console.error('Key must be a non-empty string');
      return false;
    }

    try {
      const data = this.getData();
      if (key in data) {
        delete data[key];
        this.saveData(data);
        return true;
      }
      return false;
    } catch (error) {
      console.error(`Failed to remove item for key ${key}:`, error);
      return false;
    }
  }

  /**
   * Clears all data under the parent key.
   * @returns {boolean} True if the operation was successful, false otherwise.
   */
  public clear(): boolean {
    if (!this.isSupported) {
      console.error('localStorage is not supported');
      return false;
    }

    try {
      window.localStorage.setItem(this.parentKey, JSON.stringify({}));
      return true;
    } catch (error) {
      console.error(`Failed to clear localStorage for ${this.parentKey}:`, error);
      return false;
    }
  }

  /**
   * Gets all keys stored under the parent key.
   * @returns {string[] | null} Array of keys, or null if operation fails.
   */
  public getAllKeys(): string[] | null {
    try {
      const data = this.getData();
      return Object.keys(data);
    } catch (error) {
      console.error('Failed to get all keys:', error);
      return null;
    }
  }

  /**
   * Checks if a specific key exists under the parent key.
   * @param {string} key - The key to check.
   * @returns {boolean} True if the key exists, false otherwise.
   */
  public hasItem(key: string): boolean {
    if (typeof key !== 'string' || key.trim() === '') {
      console.error('Key must be a non-empty string');
      return false;
    }

    try {
      const data = this.getData();
      return key in data;
    } catch (error) {
      console.error(`Failed to check item for key ${key}:`, error);
      return false;
    }
  }
}