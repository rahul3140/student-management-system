import java.util.*;

public class Main {
    static class Student {
        int id;
        String name, course;
        double marks;

        Student(int id, String name, String course, double marks) {
            this.id = id;
            this.name = name;
            this.course = course;
            this.marks = marks;
        }

        public String toString() {
            return id + " | " + name + " | " + course + " | " + marks;
        }
    }

    static Scanner sc = new Scanner(System.in);
    static List<Student> list = new ArrayList<>();

    public static void main(String[] a) {
        while (true) {
            System.out.println("\n========== Student Management System ==========");
            System.out.println("1. Add");
            System.out.println("2. View All");
            System.out.println("3. Search");
            System.out.println("4. Update");
            System.out.println("5. Delete");
            System.out.println("6. Exit");
            System.out.print("Enter your choice: ");

            int c = sc.nextInt();
            sc.nextLine();

            if (c == 1) {
                System.out.print("ID: ");
                int id = sc.nextInt();
                sc.nextLine();
                System.out.print("Name: ");
                String n = sc.nextLine();
                System.out.print("Course: ");
                String co = sc.nextLine();
                System.out.print("Marks: ");
                double m = sc.nextDouble();
                list.add(new Student(id, n, co, m));
                System.out.println("✓ Student added successfully!");
            } else if (c == 2) {
                if (list.isEmpty()) {
                    System.out.println("No students in the system.");
                } else {
                    System.out.println("\n========== All Students ==========");
                    list.forEach(System.out::println);
                }
            } else if (c == 3) {
                System.out.print("Enter ID to search: ");
                int id = sc.nextInt();
                boolean found = false;
                for (Student s : list) {
                    if (s.id == id) {
                        System.out.println("Found: " + s);
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    System.out.println("Student not found!");
                }
            } else if (c == 4) {
                System.out.print("Enter ID to update: ");
                int id = sc.nextInt();
                sc.nextLine();
                boolean found = false;
                for (Student s : list) {
                    if (s.id == id) {
                        System.out.print("New name: ");
                        s.name = sc.nextLine();
                        System.out.print("New course: ");
                        s.course = sc.nextLine();
                        System.out.print("New marks: ");
                        s.marks = sc.nextDouble();
                        System.out.println("✓ Student updated successfully!");
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    System.out.println("Student not found!");
                }
            } else if (c == 5) {
                System.out.print("Enter ID to delete: ");
                int id = sc.nextInt();
                if (list.removeIf(s -> s.id == id)) {
                    System.out.println("✓ Student deleted successfully!");
                } else {
                    System.out.println("Student not found!");
                }
            } else if (c == 6) {
                System.out.println("Thank you for using Student Management System!");
                break;
            } else {
                System.out.println("Invalid choice! Please try again.");
            }
        }
        sc.close();
    }
}
