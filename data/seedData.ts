export const seedData = {
  users: [
    {
      id: 'user1',
      username: 'johndoe',
      email: 'john@example.com',
      password: 'user1Password',
      fullName: 'John Doe',
      avatar: 'avatar1.jpg',
      bio: 'Passionate about project management',
      createdAt: '2023-01-15T08:00:00Z',
      updatedAt: '2023-12-01T10:30:00Z',
    },
    {
      id: 'user2',
      username: 'janedoe',
      email: 'jane@example.com',
      password: 'user2Password',
      fullName: 'Jane Doe',
      avatar: 'avatar2.jpg',
      createdAt: '2023-02-20T09:15:00Z',
      updatedAt: '2023-11-28T11:45:00Z',
    },
    {
      id: 'user3',
      username: 'alice_smith',
      email: 'alice@example.com',
      password: 'user3Password',
      fullName: 'Alice Smith',
      avatar: 'avatar3.jpg',
      bio: 'Tech enthusiast and problem solver',
      createdAt: '2023-03-10T11:20:00Z',
      updatedAt: '2023-12-03T14:00:00Z',
    },
    {
      id: 'user4',
      username: 'bob_rogers',
      email: 'bob@example.com',
      password: 'user4Password',
      fullName: 'Bob Rogers',
      avatar: 'avatar4.jpg',
      createdAt: '2023-04-05T13:45:00Z',
      updatedAt: '2023-12-02T09:30:00Z',
    },
    {
      id: 'user5',
      username: 'sarah_smith',
      email: 'sarah@example.com',
      password: 'user5Password',
      fullName: 'Sarah Smith',
      avatar: 'avatar5.jpg',
      bio: 'Art lover and traveler',
      createdAt: '2023-05-12T16:00:00Z',
      updatedAt: '2023-11-30T12:15:00Z',
    },
  ],
  projects: [
    {
      id: 'project1',
      title: 'Website Redesign',
      description: 'Revamp the company website with modern design',
      startDate: '2023-02-01T00:00:00Z',
      endDate: '2023-06-30T23:59:59Z',
      createdAt: '2023-01-20T10:00:00Z',
      updatedAt: '2023-12-01T15:30:00Z',
      userId: 'user1',
    },
    {
      id: 'project2',
      title: 'Marketing Campaign',
      startDate: '2023-03-15T00:00:00Z',
      createdAt: '2023-02-25T09:30:00Z',
      updatedAt: '2023-11-29T14:45:00Z',
      userId: 'user2',
    },
    {
      id: 'project3',
      title: 'Mobile App Development',
      description: 'Create a mobile app for iOS and Android platforms',
      startDate: '2023-04-10T00:00:00Z',
      createdAt: '2023-03-05T11:45:00Z',
      updatedAt: '2023-12-03T17:00:00Z',
      userId: 'user3',
    },
    {
      id: 'project4',
      title: 'Product Launch',
      startDate: '2023-05-20T00:00:00Z',
      endDate: '2023-09-30T23:59:59Z',
      createdAt: '2023-04-08T14:30:00Z',
      updatedAt: '2023-12-02T11:00:00Z',
      userId: 'user4',
    },
    {
      id: 'project5',
      title: 'Research Study',
      description: 'Conduct a market research study for new product ideas',
      startDate: '2023-06-25T00:00:00Z',
      createdAt: '2023-05-18T17:00:00Z',
      updatedAt: '2023-11-30T13:15:00Z',
      userId: 'user5',
    },
  ],
  tasks: [
    {
      id: 'task1',
      title: 'Design Mockups',
      status: 'In Progress',
      projectId: 'project1',
      priority: 'High',
      createdAt: '2023-02-05T08:00:00Z',
      updatedAt: '2023-12-01T11:30:00Z',
    },
    {
      id: 'task2',
      title: 'Content Writing',
      description: 'Write engaging content for the website',
      projectId: 'project1',
      priority: 'Low',
      createdAt: '2023-02-10T09:30:00Z',
      updatedAt: '2023-11-29T12:45:00Z',
    },
    {
      id: 'task3',
      title: 'Social Media Ads',
      status: 'Todo',
      projectId: 'project2',
      priority: 'Medium',
      createdAt: '2023-03-20T11:45:00Z',
      updatedAt: '2023-12-03T15:00:00Z',
    },
    {
      id: 'task4',
      title: 'Wireframing',
      description: 'Create wireframes for the mobile app',
      status: 'In Progress',
      projectId: 'project3',
      createdAt: '2023-04-15T13:00:00Z',
      updatedAt: '2023-12-02T10:30:00Z',
    },
    {
      id: 'task5',
      title: 'Market Analysis',
      description: 'Research market trends and competitors',
      status: 'Todo',
      projectId: 'project5',
      createdAt: '2023-06-01T15:15:00Z',
      updatedAt: '2023-11-30T14:00:00Z',
    },
  ],
};
