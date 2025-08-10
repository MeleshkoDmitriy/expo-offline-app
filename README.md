# Expo Offline Todo App

A comprehensive offline-first todo application built with React Native and Expo, demonstrating multiple local database solutions and network status monitoring.

## 🎯 Project Overview

This application showcases an offline-first approach to mobile development, implementing two different local database solutions (Realm and SQLite) alongside real-time network connectivity monitoring. The app provides a complete CRUD (Create, Read, Update, Delete) interface for managing todo items with full offline functionality.

## 🏗️ Architecture

### Core Technologies
- **React Native** with **Expo SDK 53**
- **TypeScript** for type safety
- **React Navigation** for tab-based navigation
- **@react-native-community/netinfo** for network status monitoring

### Database Solutions
The app implements two separate local database solutions:

#### 1. **Realm Database**
- **Library**: `realm` and `@realm/react`
- **Features**: 
  - Object-oriented database with automatic schema management
  - Real-time data synchronization
  - UUID-based primary keys
  - Automatic indexing for performance
  - Built-in data validation

#### 2. **SQLite Database**
- **Library**: `expo-sqlite`
- **Features**:
  - Traditional SQL database with full CRUD operations
  - Custom SQLiteService class for database management
  - Manual schema creation and management
  - Integer-based auto-incrementing primary keys

### Network Monitoring
- **Library**: `@react-native-community/netinfo`
- **Features**:
  - Real-time network connectivity status
  - Network type detection (WiFi, Cellular, etc.)
  - Visual indicators in app headers
  - Context-based network status sharing

## 📱 Features

### Todo Management
- ✅ **Create** new todo items with title and description
- ✅ **Read** todo lists with real-time updates
- ✅ **Update** existing todos (edit title/description, toggle completion)
- ✅ **Delete** todos with confirmation
- ✅ **Toggle** completion status with visual indicators
- ✅ **Pull-to-refresh** functionality for data reloading

### Offline-First Design
- 🔄 **Full offline functionality** - all operations work without internet
- 📊 **Dual database support** - compare Realm vs SQLite performance
- 🔄 **Real-time synchronization** - automatic updates across components
- 📱 **Native performance** - optimized for mobile devices

### User Interface
- 🎨 **Modern UI** with custom components and styling
- 📱 **Responsive design** for different screen sizes
- 🔄 **Loading states** with activity indicators
- 📝 **Form validation** with error handling
- 🎯 **Intuitive navigation** with tab-based interface

### Network Status
- 🌐 **Real-time network monitoring**
- 🟢 **Visual status indicators** (green/red dots)
- 📡 **Network type display** (WiFi, Cellular, etc.)
- 📊 **Header-based status** in both database sections

## 🗂️ Project Structure

```
expo-offline-app/
├── App.tsx                          # Main app with providers
├── components/
│   ├── realm/                       # Realm-specific components
│   │   ├── TodoForm.tsx            # Create/edit todo form
│   │   ├── TodoItem.tsx            # Individual todo item
│   │   └── TodoList.tsx            # Todo list with pull-to-refresh
│   ├── sqlite/                      # SQLite-specific components
│   │   ├── TodoForm.tsx            # Create/edit todo form
│   │   ├── TodoItem.tsx            # Individual todo item
│   │   └── TodoList.tsx            # Todo list with pull-to-refresh
│   ├── NetInfoIndicator.tsx        # Network status indicator
│   ├── CustomButton.tsx            # Reusable button component
│   └── ScreenWrapper.tsx           # Screen layout wrapper
├── screens/
│   ├── RealmScreen.tsx             # Main Realm todo screen
│   ├── SQLScreen.tsx               # Main SQLite todo screen
│   ├── EditRealmScreen.tsx         # Edit Realm todo screen
│   └── EditSQLScreen.tsx           # Edit SQLite todo screen
├── services/
│   ├── task.ts                     # Realm Task model
│   └── sqlite.ts                   # SQLite service class
├── context/
│   └── net-info-context.tsx        # Network info context
├── hooks/
│   └── useNetworkStatus.ts         # Network status hook
├── navigation/
│   ├── AppNavigator.tsx            # Main navigation setup
│   └── routes.ts                   # Route constants
└── types/
    ├── types.ts                     # Shared type definitions
    └── navigation.ts                # Navigation type definitions
```

## 🚀 Key Features Implemented

### Realm Database Features
- **Object-Oriented Data Model**: Task class with UUID primary keys
- **Real-time Queries**: Automatic UI updates when data changes
- **Schema Management**: Automatic schema validation and migration
- **Performance Optimization**: Indexed fields for faster queries
- **Type Safety**: Full TypeScript integration

### SQLite Database Features
- **Custom Service Layer**: SQLiteService class for database operations
- **Manual Schema Management**: Explicit table creation and management
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **Error Handling**: Comprehensive error handling and user feedback
- **Data Transformation**: Automatic date formatting and type conversion

### Network Monitoring Features
- **Real-time Status**: Live network connectivity monitoring
- **Visual Indicators**: Color-coded status dots (green/red)
- **Network Type Detection**: WiFi, Cellular, and other connection types
- **Context Integration**: Global network status sharing
- **Header Integration**: Status display in app navigation headers

### UI/UX Features
- **Dual Interface**: Separate tabs for Realm and SQLite databases
- **Modal Editing**: Full-screen edit forms for todo modification
- **Pull-to-Refresh**: Swipe down to reload data
- **Loading States**: Activity indicators during data operations
- **Error Handling**: User-friendly error messages and alerts
- **Responsive Design**: Works on different screen sizes

## 🛠️ Technical Implementation

### Database Integration
- **Realm**: Uses `@realm/react` for reactive data binding
- **SQLite**: Custom service layer with `expo-sqlite`
- **Data Synchronization**: Real-time updates across components
- **Error Recovery**: Graceful handling of database errors

### Network Status Integration
- **Context Provider**: Global network status sharing
- **Custom Hook**: `useNetworkStatus` for easy access
- **Visual Feedback**: Real-time status indicators
- **Type Safety**: Full TypeScript integration

### Navigation Structure
- **Tab Navigation**: Bottom tabs for database selection
- **Stack Navigation**: Nested stacks for each database
- **Modal Presentation**: Edit screens as modals
- **Type Safety**: Fully typed navigation parameters

## 📊 Performance Features

- **Offline-First**: All operations work without internet
- **Real-time Updates**: Automatic UI synchronization
- **Optimized Queries**: Indexed fields for better performance
- **Memory Management**: Efficient data loading and caching
- **Error Recovery**: Graceful handling of network/database issues

## 🔧 Development Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npx expo start
   ```

3. **Run on Device/Simulator**:
   ```bash
   npx expo run:ios
   # or
   npx expo run:android
   ```

## 📱 Platform Support

- ✅ **iOS**: Full support with native SQLite and Realm
- ✅ **Android**: Full support with native SQLite and Realm
- 🔄 **Web**: Limited support (SQLite not available on web)

## 🎯 Use Cases

This application demonstrates:
- **Offline-First Development**: Building apps that work without internet
- **Multiple Database Solutions**: Comparing different local storage approaches
- **Real-time Network Monitoring**: Implementing network status awareness
- **Modern React Native Patterns**: Context, hooks, and TypeScript
- **Mobile-First Design**: Optimized UI/UX for mobile devices

## 🔮 Future Enhancements

- **Data Synchronization**: Sync local data with remote servers
- **Conflict Resolution**: Handle data conflicts when online
- **Advanced Queries**: Complex filtering and sorting
- **Data Export**: Export todos to various formats
- **Cloud Backup**: Automatic backup to cloud storage
