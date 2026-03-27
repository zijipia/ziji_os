export interface Project {
  id: string;
  displayId: string;
  title: string;
  status: string;
  tags: string[];
  color: 'primary' | 'secondary' | 'tertiary';
  url: string;
  description: string;
}

export interface Spec {
  category: string;
  items: string[];
  description?: string;
}

export const fetchRepos = async (): Promise<Project[]> => {
  try {
    const [res1, res2] = await Promise.all([
      fetch('https://api.github.com/users/zijipia/repos?sort=updated&per_page=10'),
      fetch('https://api.github.com/users/ZiProject/repos?sort=updated&per_page=10')
    ]);

    if (!res1.ok || !res2.ok) throw new Error('Failed to fetch repositories');

    const data1 = await res1.json();
    const data2 = await res2.json();

    const combinedData = [...data1, ...data2];
    const uniqueRepos = Array.from(new Map(combinedData.map(item => [item.node_id, item])).values());

    return uniqueRepos
      .sort((a: any, b: any) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .map((repo: any, index: number) => ({
        id: repo.node_id,
        displayId: repo.node_id.substring(0, 8),
        title: repo.name,
        status: repo.archived ? 'ARCHIVED' : 'ACTIVE',
        tags: Array.from(new Set([repo.language, ...(repo.topics || [])].filter(Boolean).map(t => t.toUpperCase()))).slice(0, 3),
        color: (index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'tertiary') as 'primary' | 'secondary' | 'tertiary',
        url: repo.html_url,
        description: repo.description || ''
      }));
  } catch (err) {
    console.error('Error fetching repos:', err);
    return [];
  }
};

export const getSpecs = (): Spec[] => {
  return [
    {
      category: 'HARDWARE_WORKSTATION',
      items: ['128GB DDR5 RAM', '8TB NVME GEN5', 'Liquid-cooled monolithic chassis'],
      description: 'Custom workstation with integrated thermal displays.'
    },
    {
      category: 'HUMAN_INTERFACE',
      items: ['Split mechanical keyboard', 'Linear switches', 'Trackball integration', 'QMK CONFIG', 'OLED HUD'],
      description: 'Custom input devices for high-efficiency interaction.'
    },
    {
      category: 'SOFTWARE_OS',
      items: ['Arch Linux', 'Windows 11', 'Docker'],
      description: 'Operating systems and containerization layers.'
    },
    {
      category: 'SOFTWARE_CREATIVE',
      items: ['Neovim (LSP)', 'Figma', 'Blender 4.0'],
      description: 'Development and design tools.'
    },
    {
      category: 'SOFTWARE_AUDIO',
      items: ['Ableton Live 12', 'Serum / Vital', 'UAD Console'],
      description: 'Music production and audio engineering stack.'
    }
  ];
};
