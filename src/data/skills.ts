import type { IconType } from 'react-icons'
import { FaJava } from 'react-icons/fa6'
import { SiAmazonwebservices, SiCplusplus, SiDjango, SiGit, SiMysql, SiPython, SiReact, SiTensorflow } from 'react-icons/si'

export type Skill = {
  name: string
  Icon: IconType
  level: number // 0..100
  tone: 'cyan' | 'purple' | 'blue'
  originalColor: string
}

export const skills: Skill[] = [
  { name: 'C++', Icon: SiCplusplus, level: 78, tone: 'blue', originalColor: '#00599C' },
  { name: 'Python', Icon: SiPython, level: 80, tone: 'cyan', originalColor: '#3776AB' },
  { name: 'Java', Icon: FaJava, level: 70, tone: 'purple', originalColor: '#007396' },
  { name: 'React', Icon: SiReact, level: 82, tone: 'cyan', originalColor: '#61DAFB' },
  { name: 'Django', Icon: SiDjango, level: 74, tone: 'purple', originalColor: '#092E20' },
  { name: 'MySQL', Icon: SiMysql, level: 72, tone: 'blue', originalColor: '#4479A1' },
  { name: 'Git', Icon: SiGit, level: 76, tone: 'cyan', originalColor: '#F05032' },
  { name: 'Cloud', Icon: SiAmazonwebservices, level: 62, tone: 'blue', originalColor: '#FF9900' },
  { name: 'Machine Learning', Icon: SiTensorflow, level: 58, tone: 'purple', originalColor: '#FF6F00' },
]
