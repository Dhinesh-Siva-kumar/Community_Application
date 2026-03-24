# FLUTTER IMPLEMENTATION PLAN
## Community Platform Mobile Application

**Version:** 1.0  
**Last Updated:** March 2026  
**Status:** Production Ready  
**Audience:** Flutter Development Team  
**Platform:** iOS 14+ / Android 10+

---

## TABLE OF CONTENTS

1. [Overview & Architecture](#overview--architecture)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Theme & Design System](#theme--design-system)
5. [Screen-by-Screen Specifications](#screen-by-screen-specifications)
6. [Navigation Structure](#navigation-structure)
7. [State Management](#state-management)
8. [API Integration](#api-integration)
9. [Location Services](#location-services)
10. [Testing Strategy](#testing-strategy)
11. [Performance Optimization](#performance-optimization)
12. [Deployment Checklist](#deployment-checklist)

---

## OVERVIEW & ARCHITECTURE

### Project Goals
- Build native mobile experience for iOS and Android
- Maintain design consistency with Angular web platform
- Implement location-based (postcode) features
- Ensure smooth performance on low-end devices
- Deliver WCAG AA accessibility compliance

### Architecture Pattern
**Provider + Repository + Service Layer Architecture**

```
┌─────────────────────────────────────────────┐
│            FLUTTER APP                      │
│         (Main Entry Point)                  │
└──────────────────┬──────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
    ┌───▼────────┐      ┌────▼──────────┐
    │ PROVIDERS  │      │ ROUTER CONFIG │
    │(State Mgmt)│      │(Navigation)   │
    └───┬────────┘      └────┬──────────┘
        │                    │
    ┌───▼──────────────────┬─▼──────────────┐
    │                      │                │
┌───▼──────────┐   ┌──────▼─────┐  ┌──────▼──────┐
│ SCREENS/PAGES│   │ WIDGETS    │  │  SERVICES  │
│(Navigation)  │   │(Reusable)  │  │(API, Auth, │
│              │   │            │  │ Location)  │
└──────────────┘   └────────────┘  └────────────┘
        │                │                │
    ┌───▼────────────────▼────────────────▼───┐
    │        SHARED ASSETS                    │
    │  (Themes, Colors, Fonts, Constants)    │
    └─────────────────────────────────────────┘
         │
    ┌────▼────────────────────────────┐
    │     HTTP & LOCAL STORAGE        │
    │   (API Communication, Cache)    │
    └────────────────────────────────┘
```

### Key Architectural Decisions

| Decision | Rationale | Impact |
|----------|-----------|--------|
| **Provider Package** | Industry standard, performance, testability | Easy state management, optimized rebuilds |
| **Repository Pattern** | Separation of data source | Flexible API/cache switching |
| **Service Layer** | API, auth, location isolated | Reusability, testability |
| **GoRouter** | Modern navigation, deeplinks, guards | Clean routing, type-safe |
| **MVC Structure** | Clear separation of concerns | Maintainability |

---

## TECHNOLOGY STACK

### Core Framework
- **Flutter:** 3.19+
- **Dart:** 3.3+
- **Package Manager:** pub.dev

### State Management
- **Provider:** 6.0+
- **Riverpod:** (alternative option)

### Networking & Storage
- **http:** HTTP client
- **dio:** Advanced HTTP (optional)
- **shared_preferences:** Local storage
- **hive:** Local database (optional, for caching)

### Navigation
- **go_router:** Modern navigation

### UI Components
- **Material Design 3:** Built-in Flutter
- **google_fonts:** Font management
- **flutter_svg:** SVG support
- **cached_network_image:** Image caching

### Location & Maps
- **geolocator:** GPS location
- **geocoding:** Postcode/address lookup
- **google_maps_flutter:** Map display

### Development Tools
- **freezed:** Code generation for models
- **json_serializable:** JSON serialization
- **mockito:** Unit testing
- **integration_test:** E2E testing

### Build & Deployment
- **Firebase:** Analytics, Crashlytics
- **app_center:** App distribution (optional)

---

## PROJECT STRUCTURE

### Directory Layout

```
lib/
├── main.dart                    (App entry point)
├── config/
│   ├── router/
│   │   └── router.dart         (GoRouter configuration)
│   ├── theme/
│   │   ├── app_theme.dart      (ThemeData & ColorScheme)
│   │   ├── text_styles.dart    (Typography scales)
│   │   ├── app_colors.dart     (Color palette)
│   │   └── app_shadows.dart    (Shadow/elevation system)
│   └── constants/
│       ├── api_constants.dart
│       ├── app_constants.dart
│       └── string_constants.dart
│
├── features/                    (Feature modules)
│   ├── auth/
│   │   ├── models/
│   │   │   ├── user.dart
│   │   │   └── auth_state.dart
│   │   ├── providers/
│   │   │   ├── auth_provider.dart
│   │   │   └── user_provider.dart
│   │   ├── repositories/
│   │   │   └── auth_repository.dart
│   │   ├── services/
│   │   │   └── auth_service.dart
│   │   └── screens/
│   │       ├── login_screen.dart
│   │       ├── signup_screen.dart
│   │       ├── signup_step_1.dart
│   │       ├── signup_step_2.dart
│   │       ├── signup_step_3.dart
│   │       ├── signup_step_4.dart
│   │       ├── forgot_password_screen.dart
│   │       └── verify_email_screen.dart
│   │
│   ├── dashboard/
│   │   ├── models/
│   │   │   └── feed_item.dart
│   │   ├── providers/
│   │   │   ├── dashboard_provider.dart
│   │   │   └── feed_provider.dart
│   │   ├── repositories/
│   │   │   └── dashboard_repository.dart
│   │   └── screens/
│   │       └── dashboard_screen.dart
│   │
│   ├── communities/
│   │   ├── models/
│   │   │   └── community.dart
│   │   ├── providers/
│   │   │   └── communities_provider.dart
│   │   ├── repositories/
│   │   │   └── communities_repository.dart
│   │   ├── screens/
│   │   │   ├── communities_list_screen.dart
│   │   │   └── community_detail_screen.dart
│   │   └── widgets/
│   │       └── community_card.dart
│   │
│   ├── events/
│   │   ├── models/
│   │   │   └── event.dart
│   │   ├── providers/
│   │   │   └── events_provider.dart
│   │   ├── repositories/
│   │   │   └── events_repository.dart
│   │   ├── screens/
│   │   │   ├── events_list_screen.dart
│   │   │   └── event_detail_screen.dart
│   │   └── widgets/
│   │       └── event_card.dart
│   │
│   ├── jobs/
│   │   ├── models/
│   │   │   └── job.dart
│   │   ├── providers/
│   │   │   └── jobs_provider.dart
│   │   ├── repositories/
│   │   │   └── jobs_repository.dart
│   │   ├── screens/
│   │   │   ├── jobs_list_screen.dart
│   │   │   └── job_detail_screen.dart
│   │   └── widgets/
│   │       └── job_card.dart
│   │
│   ├── businesses/
│   │   ├── models/
│   │   │   └── business.dart
│   │   ├── providers/
│   │   │   └── businesses_provider.dart
│   │   ├── repositories/
│   │   │   └── businesses_repository.dart
│   │   ├── screens/
│   │   │   ├── businesses_list_screen.dart
│   │   │   └── business_detail_screen.dart
│   │   └── widgets/
│   │       └── business_card.dart
│   │
│   ├── profile/
│   │   ├── models/
│   │   │   └── profile.dart
│   │   ├── providers/
│   │   │   └── profile_provider.dart
│   │   ├── repositories/
│   │   │   └── profile_repository.dart
│   │   └── screens/
│   │       ├── profile_screen.dart
│   │       └── edit_profile_screen.dart
│   │
│   └── admin/
│       ├── models/
│       ├── providers/
│       ├── repositories/
│       └── screens/
│
├── shared/                      (Reusable components)
│   ├── widgets/
│   │   ├── app_button.dart
│   │   ├── app_card.dart
│   │   ├── app_input.dart
│   │   ├── app_modal.dart
│   │   ├── location_badge.dart
│   │   ├── location_selector.dart
│   │   ├── user_avatar.dart
│   │   ├── loading_spinner.dart
│   │   ├── empty_state.dart
│   │   └── error_widget.dart
│   ├── models/
│   │   ├── api_response.dart
│   │   ├── paginated_response.dart
│   │   └── error_response.dart
│   ├── providers/
│   │   ├── location_provider.dart
│   │   ├── connectivity_provider.dart
│   │   └── theme_provider.dart
│   ├── services/
│   │   ├── api_service.dart
│   │   ├── location_service.dart
│   │   ├── storage_service.dart
│   │   └── notification_service.dart
│   └── utils/
│       ├── validators.dart
│       ├── formatters.dart
│       ├── extensions.dart
│       └── helpers.dart
│
├── core/
│   ├── network/
│   │   ├── api_client.dart
│   │   ├── interceptors.dart
│   │   └── network_exception.dart
│   ├── storage/
│   │   └── local_storage.dart
│   ├── constants/
│   │   └── app_endpoints.dart
│   └── di/
│       └── service_locator.dart
│
└── assets/
    ├── images/
    │   ├── icons/
    │   ├── illustrations/
    │   └── logos/
    ├── fonts/
    │   ├── poppins/
    │   └── inter/
    └── data/
        └── mock_data.json
```

---

## THEME & DESIGN SYSTEM

### Complete ThemeData Implementation

```dart
// config/theme/app_theme.dart
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Color Palette (11 colors)
  static const Color colorPrimary = Color(0xFF5865F2);
  static const Color colorPrimaryLight = Color(0xFF7b82f6);
  static const Color colorPrimaryDark = Color(0xFF4752c4);

  static const Color colorTeal = Color(0xFF4ECDC4);
  static const Color colorRed = Color(0xFFFF6B6B);
  static const Color colorGreen = Color(0xFF2ECC71);
  static const Color colorOrange = Color(0xFFF39C12);
  static const Color colorPurple = Color(0xFF9B59B6);

  // Neutrals
  static const Color colorNeutral0 = Color(0xFFFFFFFF);
  static const Color colorNeutral50 = Color(0xFFF8F9FA);
  static const Color colorNeutral100 = Color(0xFFE8EAED);
  static const Color colorNeutral200 = Color(0xFFD0D5DD);
  static const Color colorNeutral500 = Color(0xFF71717A);
  static const Color colorNeutral900 = Color(0xFF18181B);

  // Gradients
  static const LinearGradient gradientPrimaryToTeal = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [colorPrimary, colorTeal],
  );

  // Light Theme
  static ThemeData lightTheme = ThemeData(
    useMaterial3: true,
    brightness: Brightness.light,
    colorScheme: ColorScheme.light(
      primary: colorPrimary,
      primaryContainer: colorPrimaryLight,
      secondary: colorTeal,
      tertiary: colorPurple,
      surface: colorNeutral0,
      surfaceContainer: colorNeutral50,
      error: colorRed,
      errorContainer: colorRed.withOpacity(0.1),
      outline: colorNeutral200,
      onSurface: colorNeutral900,
      onSurfaceVariant: colorNeutral500,
    ),
    // Typography
    textTheme: _buildTextTheme(),
    // Input styling
    inputDecorationTheme: _buildInputDecorationTheme(),
    // Button styling
    elevatedButtonTheme: _buildElevatedButtonTheme(),
    outlinedButtonTheme: _buildOutlinedButtonTheme(),
    textButtonTheme: _buildTextButtonTheme(),
    // Card styling
    cardTheme: CardTheme(
      color: colorNeutral0,
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      margin: const EdgeInsets.all(0),
    ),
    // App Bar styling
    appBarTheme: AppBarTheme(
      backgroundColor: colorNeutral0,
      foregroundColor: colorNeutral900,
      elevation: 0,
      centerTitle: false,
      titleTextStyle: GoogleFonts.poppins(
        fontSize: 24,
        fontWeight: FontWeight.bold,
        color: colorNeutral900,
      ),
    ),
    // Bottom Navigation styling
    bottomNavigationBarTheme: BottomNavigationBarThemeData(
      backgroundColor: colorNeutral0,
      selectedItemColor: colorPrimary,
      unselectedItemColor: colorNeutral500,
      type: BottomNavigationBarType.fixed,
      elevation: 8,
    ),
    // Divider styling
    dividerTheme: DividerThemeData(
      color: colorNeutral200,
      thickness: 1,
    ),
    // Scaffold styling
    scaffoldBackgroundColor: colorNeutral0,
  );

  // Dark Theme (optional for future)
  static ThemeData darkTheme = ThemeData(
    useMaterial3: true,
    brightness: Brightness.dark,
    // ... Dark theme configuration
  );

  // Text Theme
  static TextTheme _buildTextTheme() {
    return TextTheme(
      // Display styles (Poppins, bold)
      displayLarge: GoogleFonts.poppins(
        fontSize: 40,
        fontWeight: FontWeight.bold,
        height: 1.2,
        letterSpacing: -0.5,
      ),
      displayMedium: GoogleFonts.poppins(
        fontSize: 32,
        fontWeight: FontWeight.w600,
        height: 1.25,
        letterSpacing: -0.3,
      ),
      displaySmall: GoogleFonts.poppins(
        fontSize: 24,
        fontWeight: FontWeight.bold,
        height: 1.3,
      ),
      // Heading styles
      headlineLarge: GoogleFonts.poppins(
        fontSize: 32,
        fontWeight: FontWeight.bold,
        height: 1.25,
      ),
      headlineMedium: GoogleFonts.poppins(
        fontSize: 24,
        fontWeight: FontWeight.bold,
        height: 1.3,
      ),
      headlineSmall: GoogleFonts.poppins(
        fontSize: 18,
        fontWeight: FontWeight.w600,
        height: 1.4,
      ),
      // Title styles
      titleLarge: GoogleFonts.inter(
        fontSize: 16,
        fontWeight: FontWeight.w600,
        height: 1.5,
      ),
      titleMedium: GoogleFonts.inter(
        fontSize: 14,
        fontWeight: FontWeight.w600,
        height: 1.5,
      ),
      titleSmall: GoogleFonts.inter(
        fontSize: 12,
        fontWeight: FontWeight.w600,
        height: 1.4,
      ),
      // Body styles
      bodyLarge: GoogleFonts.inter(
        fontSize: 16,
        fontWeight: FontWeight.w400,
        height: 1.5,
      ),
      bodyMedium: GoogleFonts.inter(
        fontSize: 14,
        fontWeight: FontWeight.w400,
        height: 1.5,
      ),
      bodySmall: GoogleFonts.inter(
        fontSize: 12,
        fontWeight: FontWeight.w400,
        height: 1.4,
      ),
      // Label styles
      labelLarge: GoogleFonts.inter(
        fontSize: 12,
        fontWeight: FontWeight.w500,
        height: 1.4,
      ),
      labelMedium: GoogleFonts.inter(
        fontSize: 11,
        fontWeight: FontWeight.w500,
        height: 1.4,
      ),
      labelSmall: GoogleFonts.inter(
        fontSize: 10,
        fontWeight: FontWeight.w400,
        height: 1.4,
        letterSpacing: 0.2,
      ),
    );
  }

  // Input Decoration Theme
  static InputDecorationTheme _buildInputDecorationTheme() {
    return InputDecorationTheme(
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(6),
        borderSide: const BorderSide(color: colorNeutral200),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(6),
        borderSide: const BorderSide(color: colorNeutral200),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(6),
        borderSide: const BorderSide(color: colorPrimary, width: 2),
      ),
      errorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(6),
        borderSide: const BorderSide(color: colorRed),
      ),
      focusedErrorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(6),
        borderSide: const BorderSide(color: colorRed, width: 2),
      ),
      filled: true,
      fillColor: colorNeutral50,
      hintStyle: GoogleFonts.inter(
        color: colorNeutral500,
        fontSize: 14,
      ),
      labelStyle: GoogleFonts.inter(
        color: colorNeutral900,
        fontSize: 14,
        fontWeight: FontWeight.w500,
      ),
      errorStyle: GoogleFonts.inter(
        color: colorRed,
        fontSize: 12,
      ),
    );
  }

  // Elevated Button Theme
  static ElevatedButtonThemeData _buildElevatedButtonTheme() {
    return ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: colorPrimary,
        foregroundColor: colorNeutral0,
        elevation: 0,
        minimumSize: const Size(double.infinity, 48),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(6),
        ),
        textStyle: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }

  // Outlined Button Theme
  static OutlinedButtonThemeData _buildOutlinedButtonTheme() {
    return OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        foregroundColor: colorNeutral900,
        side: const BorderSide(color: colorNeutral200),
        minimumSize: const Size(double.infinity, 48),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(6),
        ),
        textStyle: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }

  // Text Button Theme
  static TextButtonThemeData _buildTextButtonTheme() {
    return TextButtonThemeData(
      style: TextButton.styleFrom(
        foregroundColor: colorPrimary,
        textStyle: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }
}
```

### Color Palette Reference

```dart
// config/theme/app_colors.dart
class AppColors {
  // Brand colors
  static const primary = Color(0xFF5865F2);
  static const primaryLight = Color(0xFF7b82f6);
  static const primaryDark = Color(0xFF4752c4);

  // Accent colors
  static const teal = Color(0xFF4ECDC4);
  static const red = Color(0xFFFF6B6B);
  static const green = Color(0xFF2ECC71);
  static const orange = Color(0xFFF39C12);
  static const purple = Color(0xFF9B59B6);

  // Neutral colors
  static const white = Color(0xFFFFFFFF);
  static const neutral50 = Color(0xFFF8F9FA);
  static const neutral100 = Color(0xFFE8EAED);
  static const neutral200 = Color(0xFFD0D5DD);
  static const neutral500 = Color(0xFF71717A);
  static const neutral900 = Color(0xFF18181B);

  // Semantic colors
  static const success = Color(0xFF2ECC71);
  static const warning = Color(0xFFF39C12);
  static const error = Color(0xFFFF6B6B);
  static const info = Color(0xFF5865F2);
}
```

### Spacing System

```dart
// config/theme/app_spacing.dart
class AppSpacing {
  static const xs = 4.0;
  static const sm = 8.0;
  static const md = 16.0;
  static const lg = 24.0;
  static const xl = 32.0;
  static const xxl = 48.0;
  static const xxxl = 64.0;
}
```

### Elevation/Shadow System

```dart
// config/theme/app_shadows.dart
class AppShadows {
  static const BoxShadow elevation1 = BoxShadow(
    color: Color.fromRGBO(0, 0, 0, 0.05),
    blurRadius: 2,
    offset: Offset(0, 1),
  );

  static const BoxShadow elevation2 = BoxShadow(
    color: Color.fromRGBO(0, 0, 0, 0.1),
    blurRadius: 3,
    offset: Offset(0, 1),
  );

  static const BoxShadow elevation3 = BoxShadow(
    color: Color.fromRGBO(0, 0, 0, 0.1),
    blurRadius: 6,
    offset: Offset(0, 4),
  );

  static const BoxShadow elevation4 = BoxShadow(
    color: Color.fromRGBO(0, 0, 0, 0.1),
    blurRadius: 15,
    offset: Offset(0, 10),
  );
}
```

---

## SCREEN-BY-SCREEN SPECIFICATIONS

### 1. SPLASH SCREEN

**Purpose:** App startup with splash logo

```dart
// features/auth/screens/splash_screen.dart
class SplashScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              AppTheme.colorPrimary,
              AppTheme.colorTeal,
            ],
          ),
        ),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Logo
              SizedBox(
                height: 100,
                width: 100,
                child: Image.asset('assets/images/logo.png'),
              ),
              const SizedBox(height: 24),
              Text(
                'Community App',
                style: Theme.of(context).textTheme.displaySmall?.copyWith(
                  color: AppTheme.colorNeutral0,
                ),
              ),
              const SizedBox(height: 48),
              const CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(
                  AppTheme.colorNeutral0,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

### 2. LOGIN SCREEN

**Layout:**

```
┌─────────────────────────────────┐
│                                 │
│  LOGO                           │
│                                 │
│  Welcome Back                   │
│                                 │
│  [Email Input Field]            │
│  [Password Input Field]         │
│  [ Remember Me ]                │
│  [Login Button]                 │
│                                 │
│  Forgot Password? [Link]        │
│                                 │
│  Don't have account? [Sign up] │
│                                 │
└─────────────────────────────────┘
```

**Implementation:**

```dart
class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  late TextEditingController _emailController;
  late TextEditingController _passwordController;
  bool _rememberMe = false;

  @override
  void initState() {
    super.initState();
    _emailController = TextEditingController();
    _passwordController = TextEditingController();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(
            horizontal: AppSpacing.lg,
            vertical: AppSpacing.xl,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(height: 48),
              // Logo
              Center(
                child: Image.asset(
                  'assets/images/logo.png',
                  height: 60,
                ),
              ),
              SizedBox(height: 48),
              // Title
              Text(
                'Welcome Back',
                style: Theme.of(context).textTheme.displaySmall,
              ),
              SizedBox(height: AppSpacing.md),
              Text(
                'Sign in to your account',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: AppTheme.colorNeutral500,
                ),
              ),
              SizedBox(height: AppSpacing.xl),
              // Email input
              TextField(
                controller: _emailController,
                decoration: InputDecoration(
                  labelText: 'Email',
                  hintText: 'your@email.com',
                  prefixIcon: Icon(Icons.email_outlined),
                ),
              ),
              SizedBox(height: AppSpacing.lg),
              // Password input
              TextField(
                controller: _passwordController,
                obscureText: true,
                decoration: InputDecoration(
                  labelText: 'Password',
                  hintText: 'Your password',
                  prefixIcon: Icon(Icons.lock_outlined),
                ),
              ),
              SizedBox(height: AppSpacing.md),
              // Remember me checkbox
              Row(
                children: [
                  Checkbox(
                    value: _rememberMe,
                    onChanged: (value) {
                      setState(() => _rememberMe = value ?? false);
                    },
                  ),
                  Text(
                    'Remember me',
                    style: Theme.of(context).textTheme.bodyMedium,
                  ),
                ],
              ),
              SizedBox(height: AppSpacing.xl),
              // Login button
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: _handleLogin,
                  child: Text('Sign In'),
                ),
              ),
              SizedBox(height: AppSpacing.lg),
              // Forgot password link
              Center(
                child: TextButton(
                  onPressed: () {
                    context.push('/auth/forgot-password');
                  },
                  child: Text('Forgot password?'),
                ),
              ),
              SizedBox(height: AppSpacing.xl),
              // Sign up link
              Center(
                child: RichText(
                  text: TextSpan(
                    text: "Don't have an account? ",
                    style: Theme.of(context).textTheme.bodyMedium,
                    children: [
                      TextSpan(
                        text: 'Sign up',
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: AppTheme.colorPrimary,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _handleLogin() {
    // Call auth provider to login
    // ref.read(authProvider.notifier).login(
    //   _emailController.text,
    //   _passwordController.text,
    // );
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }
}
```

### 3. SIGNUP SCREEN (4-Step)

Similar structure to Angular, with step-based navigation:

```dart
class SignupScreen extends ConsumerStatefulWidget {
  @override
  ConsumerState<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends ConsumerState<SignupScreen> {
  late PageController _pageController;
  int _currentStep = 0;

  @override
  void initState() {
    super.initState();
    _pageController = PageController();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Step ${_currentStep + 1} of 4'),
        leading: _currentStep > 0
            ? IconButton(
                icon: Icon(Icons.arrow_back),
                onPressed: () => _pageController.previousPage(
                  duration: Duration(milliseconds: 300),
                  curve: Curves.easeInOut,
                ),
              )
            : null,
      ),
      body: PageView(
        controller: _pageController,
        onPageChanged: (index) {
          setState(() => _currentStep = index);
        },
        children: [
          SignupStep1(), // Email
          SignupStep2(), // Profile
          SignupStep3(), // Postcode & Interests
          SignupStep4(), // Confirmation
        ],
      ),
    );
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }
}
```

### 4. DASHBOARD SCREEN

**Layout with Bottom Navigation:**

```
┌────────────────────────────────┐
│  [App Bar with Location Badge] │
├────────────────────────────────┤
│                                │
│     WELCOME CARD               │
│     Hi John!                   │
│     📍 London, UK             │
│                                │
│     QUICK ACTIONS (Grid)       │
│     [Create Post] [Join Event] │
│     [Find Job] [Find Business] │
│                                │
│     FEED                       │
│     [Post Card]                │
│     [Event Card]               │
│     [Job Card]                 │
│                                │
├────────────────────────────────┤
│ 🏠  Communities  Events  Menu   │
│ Bottom Navigation              │
└────────────────────────────────┘
```

**Implementation:**

```dart
class DashboardScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final userLocation = ref.watch(locationProvider);
    final feed = ref.watch(feedProvider);

    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Icon(Icons.location_on, size: 20),
            SizedBox(width: 8),
            Text(userLocation.area),
            SizedBox(width: 8),
            GestureDetector(
              onTap: () {
                showModalBottomSheet(
                  context: context,
                  builder: (_) => LocationSelectorWidget(),
                );
              },
              child: Icon(Icons.edit, size: 16),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: Icon(Icons.notifications_outlined),
            onPressed: () {},
          ),
        ],
      ),
      body: ListView(
        padding: EdgeInsets.all(AppSpacing.lg),
        children: [
          // Welcome card
          WelcomeCard(),
          SizedBox(height: AppSpacing.xl),
          // Quick actions
          QuickActionsGrid(),
          SizedBox(height: AppSpacing.xl),
          // Feed
          ...feed.map((item) => Column(
            children: [
              _buildFeedItem(context, item),
              SizedBox(height: AppSpacing.lg),
            ],
          )),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: [
          BottomNavigationBarItem(
            icon: Icon(Icons.home_outlined),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.groups_outlined),
            label: 'Communities',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.event_outlined),
            label: 'Events',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.menu),
            label: 'More',
          ),
        ],
        onTap: (index) {
          // Navigate based on index
        },
      ),
    );
  }

  Widget _buildFeedItem(BuildContext context, FeedItem item) {
    if (item is PostFeedItem) {
      return PostCard(post: item.post);
    } else if (item is EventFeedItem) {
      return EventCard(event: item.event);
    } else {
      return SizedBox.shrink();
    }
  }
}
```

### 5. COMMUNITIES SCREEN

```dart
class CommunitiesListScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final communities = ref.watch(communitiesProvider);
    final searchQuery = ref.watch(searchProvider);
    final selectedRadius = ref.watch(radiusFilterProvider);

    return Scaffold(
      appBar: AppBar(
        title: Text('Communities'),
      ),
      body: Column(
        children: [
          // Search bar
          Padding(
            padding: EdgeInsets.all(AppSpacing.lg),
            child: SearchBar(),
          ),
          // Filters
          Padding(
            padding: EdgeInsets.symmetric(horizontal: AppSpacing.lg),
            child: FilterChips(),
          ),
          // Communities list
          Expanded(
            child: communities.when(
              data: (items) => ListView.builder(
                itemCount: items.length,
                itemBuilder: (context, index) {
                  return Padding(
                    padding: EdgeInsets.all(AppSpacing.lg),
                    child: CommunityCard(community: items[index]),
                  );
                },
              ),
              loading: () => LoadingSpinner(),
              error: (error, stack) => ErrorWidget(),
            ),
          ),
        ],
      ),
    );
  }
}
```

### 6. EVENTS, JOBS, BUSINESSES SCREENS

Similar structure to Communities with location filtering, distance display, and action buttons.

### 7. PROFILE SCREEN

```dart
class ProfileScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(currentUserProvider);

    return Scaffold(
      appBar: AppBar(
        title: Text('Profile'),
        actions: [
          IconButton(
            icon: Icon(Icons.edit),
            onPressed: () => context.push('/profile/edit'),
          ),
        ],
      ),
      body: user.when(
        data: (userData) => ListView(
          children: [
            // Profile header
            Center(
              child: Column(
                children: [
                  SizedBox(height: AppSpacing.xl),
                  CircleAvatar(
                    radius: 50,
                    backgroundImage: NetworkImage(userData.avatar),
                  ),
                  SizedBox(height: AppSpacing.md),
                  Text(
                    userData.fullName,
                    style: Theme.of(context).textTheme.headlineMedium,
                  ),
                  Text(
                    '📍 ${userData.location}',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: AppTheme.colorNeutral500,
                    ),
                  ),
                  SizedBox(height: AppSpacing.xl),
                ],
              ),
            ),
            // Stats
            Padding(
              padding: EdgeInsets.symmetric(horizontal: AppSpacing.lg),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  _buildStatCard('12', 'Posts'),
                  _buildStatCard('8', 'Events'),
                  _buildStatCard('45', 'Followers'),
                ],
              ),
            ),
            SizedBox(height: AppSpacing.xl),
            // About section
            Padding(
              padding: EdgeInsets.symmetric(horizontal: AppSpacing.lg),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'About',
                    style: Theme.of(context).textTheme.titleLarge,
                  ),
                  SizedBox(height: AppSpacing.md),
                  Text(
                    userData.bio,
                    style: Theme.of(context).textTheme.bodyMedium,
                  ),
                ],
              ),
            ),
            SizedBox(height: AppSpacing.xl),
            // Settings & Logout
            Padding(
              padding: EdgeInsets.symmetric(horizontal: AppSpacing.lg),
              child: Column(
                children: [
                  ListTile(
                    title: Text('Settings'),
                    trailing: Icon(Icons.arrow_forward),
                    onTap: () => context.push('/settings'),
                  ),
                  ListTile(
                    title: Text('Logout'),
                    onTap: () {
                      ref.read(authProvider.notifier).logout();
                    },
                  ),
                ],
              ),
            ),
          ],
        ),
        loading: () => LoadingSpinner(),
        error: (error, stack) => ErrorWidget(),
      ),
    );
  }

  Widget _buildStatCard(String value, String label) {
    return Column(
      children: [
        Text(
          value,
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
            color: AppTheme.colorPrimary,
          ),
        ),
        SizedBox(height: 4),
        Text(
          label,
          style: TextStyle(fontSize: 12, color: AppTheme.colorNeutral500),
        ),
      ],
    );
  }
}
```

---

## NAVIGATION STRUCTURE

### GoRouter Configuration

```dart
// config/router/router.dart
final goRouter = GoRouter(
  initialLocation: '/',
  debugLogDiagnostics: true,
  routes: [
    // Splash
    GoRoute(
      path: '/splash',
      builder: (context, state) => SplashScreen(),
    ),
    // Auth routes
    GoRoute(
      path: '/auth',
      routes: [
        GoRoute(
          path: 'login',
          builder: (context, state) => LoginScreen(),
        ),
        GoRoute(
          path: 'signup',
          builder: (context, state) => SignupScreen(),
        ),
        GoRoute(
          path: 'forgot-password',
          builder: (context, state) => ForgotPasswordScreen(),
        ),
      ],
    ),
    // Main app (authenticated)
    StatefulShellRoute.withBuilder(
      builder: (context, state, navigationShell) {
        return MainScaffold(navigationShell: navigationShell);
      },
      branches: [
        // Home branch
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: '/',
              builder: (context, state) => DashboardScreen(),
            ),
          ],
        ),
        // Communities branch
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: '/communities',
              builder: (context, state) => CommunitiesListScreen(),
              routes: [
                GoRoute(
                  path: ':id',
                  builder: (context, state) => CommunityDetailScreen(
                    id: state.pathParameters['id']!,
                  ),
                ),
              ],
            ),
          ],
        ),
        // Events branch
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: '/events',
              builder: (context, state) => EventsListScreen(),
              routes: [
                GoRoute(
                  path: ':id',
                  builder: (context, state) => EventDetailScreen(
                    id: state.pathParameters['id']!,
                  ),
                ),
              ],
            ),
          ],
        ),
        // Profile branch
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: '/profile',
              builder: (context, state) => ProfileScreen(),
              routes: [
                GoRoute(
                  path: 'edit',
                  builder: (context, state) => EditProfileScreen(),
                ),
              ],
            ),
          ],
        ),
      ],
    ),
  ],
);
```

---

## STATE MANAGEMENT

### Provider Setup Example

```dart
// shared/providers/location_provider.dart
import 'package:flutter_riverpod/flutter_riverpod.dart';

final locationProvider = StateNotifierProvider<
  LocationNotifier,
  AsyncValue<LocationData>
>((ref) {
  return LocationNotifier(ref.watch(locationServiceProvider));
});

class LocationNotifier extends StateNotifier<AsyncValue<LocationData>> {
  final LocationService _locationService;

  LocationNotifier(this._locationService)
    : super(const AsyncValue.loading());

  Future<void> updatePostcode(String postcode) async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(
      () => _locationService.validatePostcode(postcode),
    );
  }
}

final locationServiceProvider = Provider((ref) {
  return LocationService(
    apiClient: ref.watch(apiClientProvider),
  );
});
```

### Feature Provider Example

```dart
// features/communities/providers/communities_provider.dart
final communitiesProvider = FutureProvider.autoDispose<List<Community>>((ref) async {
  final location = ref.watch(locationProvider);
  final radius = ref.watch(radiusFilterProvider);

  return location.whenData((loc) async {
    final repository = ref.watch(communitiesRepositoryProvider);
    return repository.getNearby(
      postcode: loc.postcode,
      radiusKm: radius,
    );
  }).future;
});

final radiusFilterProvider = StateProvider<int>((ref) => 10); // 10km default
```

---

## API INTEGRATION

### API Service

```dart
// core/network/api_client.dart
class ApiClient {
  final http.Client _httpClient;
  final String baseUrl;
  static const Duration timeoutDuration = Duration(seconds: 30);

  ApiClient({
    required this.baseUrl,
    http.Client? httpClient,
  }) : _httpClient = httpClient ?? http.Client();

  Future<T> get<T>(
    String endpoint, {
    required T Function(dynamic) fromJson,
  }) async {
    try {
      final response = await _httpClient
        .get(Uri.parse('$baseUrl/$endpoint'))
        .timeout(timeoutDuration);

      if (response.statusCode == 200) {
        return fromJson(jsonDecode(response.body));
      } else if (response.statusCode == 401) {
        throw UnauthorizedException();
      } else {
        throw ServerException(response.statusCode);
      }
    } on TimeoutException {
      throw TimeoutException('Request timeout');
    } catch (e) {
      throw NetworkException(e.toString());
    }
  }

  Future<T> post<T>(
    String endpoint, {
    required Map<String, dynamic> body,
    required T Function(dynamic) fromJson,
  }) async {
    try {
      final response = await _httpClient
        .post(
          Uri.parse('$baseUrl/$endpoint'),
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode(body),
        )
        .timeout(timeoutDuration);

      if (response.statusCode == 200 || response.statusCode == 201) {
        return fromJson(jsonDecode(response.body));
      } else if (response.statusCode == 401) {
        throw UnauthorizedException();
      } else {
        throw ServerException(response.statusCode);
      }
    } on TimeoutException {
      throw TimeoutException('Request timeout');
    } catch (e) {
      throw NetworkException(e.toString());
    }
  }
}
```

### Repository Pattern

```dart
// features/communities/repositories/communities_repository.dart
class CommunitiesRepository {
  final ApiClient _apiClient;

  CommunitiesRepository(this._apiClient);

  Future<List<Community>> getNearby({
    required String postcode,
    required int radiusKm,
  }) async {
    final response = await _apiClient.get<List<dynamic>>(
      'communities/search?postcode=$postcode&radius=$radiusKm',
      fromJson: (json) => json as List<dynamic>,
    );

    return response
      .map((item) => Community.fromJson(item as Map<String, dynamic>))
      .toList();
  }

  Future<Community> getById(String id) async {
    return _apiClient.get<Community>(
      'communities/$id',
      fromJson: (json) => Community.fromJson(json as Map<String, dynamic>),
    );
  }

  Future<void> join(String communityId) async {
    await _apiClient.post(
      'communities/$communityId/join',
      body: {},
      fromJson: (json) => null,
    );
  }
}
```

---

## LOCATION SERVICES

### Location Service

```dart
// shared/services/location_service.dart
class LocationService {
  final ApiClient _apiClient;

  LocationService({required ApiClient apiClient})
    : _apiClient = apiClient;

  Future<LocationData> validatePostcode(String postcode) async {
    return _apiClient.post(
      'location/validate',
      body: {'postcode': postcode},
      fromJson: (json) => LocationData.fromJson(json as Map<String, dynamic>),
    );
  }

  Future<String> getAreaName(String postcode) async {
    final location = await validatePostcode(postcode);
    return location.area;
  }

  double calculateDistance(
    double lat1,
    double lon1,
    double lat2,
    double lon2,
  ) {
    // Haversine formula
    const R = 6371; // Earth's radius in km
    final dLat = _toRad(lat2 - lat1);
    final dLon = _toRad(lon2 - lon1);
    final a = sin(dLat / 2) * sin(dLat / 2) +
      cos(_toRad(lat1)) * cos(_toRad(lat2)) *
      sin(dLon / 2) * sin(dLon / 2);
    final c = 2 * asin(sqrt(a));
    return R * c;
  }

  double _toRad(double degree) => degree * pi / 180;
}
```

---

## TESTING STRATEGY

### Unit Tests

```dart
// test/features/communities/repositories/communities_repository_test.dart
void main() {
  group('CommunitiesRepository', () {
    late MockApiClient mockApiClient;
    late CommunitiesRepository repository;

    setUp(() {
      mockApiClient = MockApiClient();
      repository = CommunitiesRepository(mockApiClient);
    });

    test('getNearby returns list of communities', () async {
      // Arrange
      final mockResponse = [
        {'id': '1', 'name': 'Tech Community'},
        {'id': '2', 'name': 'Sports Club'},
      ];
      when(mockApiClient.get<List>(
        any,
        fromJson: anyNamed('fromJson'),
      )).thenAnswer((_) async => mockResponse);

      // Act
      final result = await repository.getNearby(
        postcode: 'SW1A 1AA',
        radiusKm: 10,
      );

      // Assert
      expect(result.length, 2);
      expect(result[0].name, 'Tech Community');
    });
  });
}
```

### Widget Tests

```dart
// test/features/communities/widgets/community_card_test.dart
void main() {
  group('CommunityCard Widget', () {
    testWidgets('displays community name', (WidgetTester tester) async {
      final community = Community(
        id: '1',
        name: 'Tech Community',
        postcode: 'SW1A 1AA',
      );

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: CommunityCard(community: community),
          ),
        ),
      );

      expect(find.text('Tech Community'), findsOneWidget);
    });

    testWidgets('join button calls onJoin callback', (WidgetTester tester) async {
      final onJoinCalled = ValueNotifier<bool>(false);

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: CommunityCard(
              community: Community(...),
              onJoin: () => onJoinCalled.value = true,
            ),
          ),
        ),
      );

      await tester.tap(find.byType(ElevatedButton));
      expect(onJoinCalled.value, true);
    });
  });
}
```

---

## PERFORMANCE OPTIMIZATION

### Image Caching

```dart
void main() {
  // Configure image cache
  imageCache.maximumSize = 100;
  imageCache.maximumSizeBytes = 100 * 1024 * 1024; // 100MB

  runApp(MyApp());
}
```

### Lazy Loading with pagination

```dart
class CommunitiesListScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final pageController = ScrollController();
    final currentPage = ref.watch(currentPageProvider);

    pageController.addListener(() {
      if (pageController.position.pixels ==
          pageController.position.maxScrollExtent) {
        // Load next page
        ref.read(currentPageProvider.notifier).state++;
      }
    });

    return Scaffold(
      body: PagedListView(
        pagingController: _pagingController,
        builderDelegate: PagedChildBuilderDelegate<Community>(
          itemBuilder: (context, community, index) =>
            CommunityCard(community: community),
        ),
      ),
    );
  }
}
```

---

## DEPLOYMENT CHECKLIST

- [ ] Run `flutter test` - all tests pass
- [ ] Run `flutter analyze` - no analysis issues
- [ ] Check dependencies - no security vulnerabilities
- [ ] Build release APK: `flutter build apk --release`
- [ ] Build release IPA: `flutter build ios --release`
- [ ] Test on physical devices (iOS + Android)
- [ ] Test accessibility (screen readers)
- [ ] Verify permissions (location, camera, microphone)
- [ ] Configure app signing
- [ ] Set up App Store Connect (iOS)
- [ ] Set up Google Play Console (Android)
- [ ] Configure crashlytics and analytics
- [ ] Create app store listing
- [ ] Beta testing (TestFlight + Google Play Beta)
- [ ] Production release

---

## PUBSPEC DEPENDENCIES

```yaml
dependencies:
  flutter:
    sdk: flutter
  
  # State management
  flutter_riverpod: ^2.4.0
  riverpod_annotation: ^2.0.0
  
  # Navigation
  go_router: ^12.0.0
  
  # HTTP & Networking
  http: ^1.1.0
  dio: ^5.3.0
  
  # Local storage
  shared_preferences: ^2.2.0
  hive: ^2.2.0
  
  # UI & Design
  google_fonts: ^6.1.0
  flutter_svg: ^2.0.0
  cached_network_image: ^3.3.0
  
  # Location & Maps
  geolocator: ^10.1.0
  geocoding: ^3.0.0
  google_maps_flutter: ^2.5.0
  
  # Code generation
  freezed_annotation: ^2.4.0
  json_annotation: ^4.8.0
  
  # Utilities
  intl: ^0.19.0
  timeago: ^3.5.0
  
  # Analytics
  firebase_analytics: ^10.8.0
  firebase_crashlytics: ^11.1.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  
  # Code generation
  build_runner: ^2.4.0
  freezed: ^2.4.0
  json_serializable: ^6.7.0
  riverpod_generator: ^2.3.0
  
  # Testing
  mockito: ^5.4.0
  fake_async: ^1.3.0

flutter:
  uses-material-design: true
  assets:
    - assets/images/
    - assets/icons/
    - assets/data/
  fonts:
    - family: Poppins
      fonts:
        - asset: assets/fonts/poppins/Poppins-Light.ttf
          weight: 300
        - asset: assets/fonts/poppins/Poppins-Regular.ttf
          weight: 400
        - asset: assets/fonts/poppins/Poppins-Medium.ttf
          weight: 500
        - asset: assets/fonts/poppins/Poppins-SemiBold.ttf
          weight: 600
        - asset: assets/fonts/poppins/Poppins-Bold.ttf
          weight: 700
    - family: Inter
      fonts:
        - asset: assets/fonts/inter/Inter-Light.ttf
          weight: 300
        - asset: assets/fonts/inter/Inter-Regular.ttf
          weight: 400
        - asset: assets/fonts/inter/Inter-Medium.ttf
          weight: 500
        - asset: assets/fonts/inter/Inter-SemiBold.ttf
          weight: 600
        - asset: assets/fonts/inter/Inter-Bold.ttf
          weight: 700
```

---

## NEXT STEPS

1. **Week 1:** Project setup, theme configuration, authentication screens
2. **Week 2:** Dashboard and communities screens
3. **Week 3:** Events, jobs, businesses screens
4. **Week 4:** Profile management and admin features
5. **Week 5:** Testing and bug fixes
6. **Week 6:** Performance optimization and refinement
7. **Week 7:** Beta testing and user feedback
8. **Week 8:** Production release and monitoring

---

**Document Version:** 1.0  
**Created:** March 2026  
**Last Updated:** March 2026  
**Status:** Production Ready  
**Audience:** Flutter Development Team