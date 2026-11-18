<!-- curar-agentes:inicio (lo genera `curar.py reglas`; no editar a mano) -->
## Agentes del proyecto

Este proyecto tiene 6 agentes propios en `.claude/agents/`. **Regla:** antes de delegar una tarea en `general-purpose`, mira esta tabla; si la tarea encaja con un agente, lánzalo a él (herramienta Agent, `subagent_type` = nombre). `general-purpose` y `Explore` quedan para búsquedas y tareas sin especialidad.

Antes de dar por terminado un cambio de código, pásalo por el agente de revisión de la tabla.

| Agente | Lánzalo para |
|---|---|
| `engineering-code-reviewer` | Expert code reviewer who provides constructive, actionable feedback focused on correctness, maintainability, security, and performance — not style preferences. |
| `engineering-frontend-developer` | Expert frontend developer specializing in modern web technologies, React/Vue/Angular frameworks, UI implementation, and performance optimization |
| `engineering-minimal-change-engineer` | Engineering specialist focused on minimum-viable diffs — fixes only what was asked, refuses scope creep, prefers three similar lines over a premature abstraction. |
| `healthcare-clinical-evidence-agent` | Evidence standards and clinical credibility framework for AI agents operating in healthcare contexts. |
| `security-senior-secops` | Defensive application security specialist who scans every code submission for secrets and sensitive data exposure before anything else, then implements or audits security controls… |
| `testing-accessibility-auditor` | Expert accessibility specialist who audits interfaces against WCAG standards, tests with assistive technologies, and ensures inclusive design. |

**Tarea nueva:** si ningún agente de esta tabla ni ninguna skill de `.claude/skills/` encaja con la tarea, antes de delegar en `general-purpose` ejecuta `/curar-agentes` en modo tarea nueva: busca en la biblioteca (`git/nuevo-proyecto`) el agente o la skill que encaje, instálalo (`curar.py copiar` + `curar.py reglas`), avisa en una línea de qué se instaló y por qué, y úsalo (en esta sesión: el agente, como `general-purpose` con las instrucciones de su fichero; la skill, leyendo su `SKILL.md` y siguiéndolo; desde la siguiente, el agente por su nombre y la skill se carga sola). Si nada encaja, sigue con `general-purpose`.
<!-- curar-agentes:fin -->
