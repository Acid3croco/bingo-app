"use client"

import { useEffect, useState } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const [categories, setCategories] = useState<string[]>([
    "Koh-Lanta",
    "Un diner presque parfait",
    "Les Marseillais"
  ])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const category = formData.get("category")
    if (category) {
      setCategories([...categories, category.toString()])
    }
    event.currentTarget.reset()
  }

  const pathname = usePathname()

  return (
    <div>
      <aside className="px-2" style={{ width: "250px" }}>
        <nav>
          <ul>
            {categories.map((category) => {
              const path = category.toLowerCase().replace(/ /g, "-")
              return (
                <li
                  key={path}
                  className={`${
                    pathname === `/${path}` ? "category-active" : ""
                  }`}
                >
                  <Link href={`/${path}`}>{category}</Link>
                </li>
              )
            })}
            <li>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  id="category"
                  name="category"
                  placeholder="New category"
                />
              </form>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  )
}
