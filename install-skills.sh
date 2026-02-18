#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
#  install-skills.sh — Install agent skills by section
#  Author: Mateusz Zając
#  Last updated: February 2026
#
#  Usage:
#    ./install-skills.sh <section>          Install skills for a section
#    ./install-skills.sh --list             List available sections
#    ./install-skills.sh --dry-run <section> Preview without installing
#    ./install-skills.sh --help             Show this help message
#
#  Sections always include "general" as a baseline.
# ═══════════════════════════════════════════════════════════════

set -euo pipefail

# ─── Color helpers ────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
BOLD='\033[1m'
DIM='\033[2m'
NC='\033[0m' # No Color

# ─── Skill Definitions ───────────────────────────────────────
# Each section is a space-separated list of skill names.
# "general" is always included as a baseline.

SKILLS_GENERAL="copywriting frontend-design vite"
SKILLS_ASO=""
SKILLS_IOS=""
SKILLS_MACOS=""
SKILLS_VISIONOS=""
SKILLS_WEBSITE="copywriting frontend-design vite"
SKILLS_FIREBASE=""
SKILLS_SUPABASE=""

# ─── Functions ────────────────────────────────────────────────

print_header() {
    echo ""
    echo -e "${BOLD}╔══════════════════════════════════════════╗${NC}"
    echo -e "${BOLD}║   🤖 Agent Skills Installer              ║${NC}"
    echo -e "${BOLD}╚══════════════════════════════════════════╝${NC}"
    echo ""
}

usage() {
    print_header
    echo -e "${BOLD}Usage:${NC}"
    echo -e "  ${CYAN}./install-skills.sh${NC} ${GREEN}<section>${NC}              Install skills for a section"
    echo -e "  ${CYAN}./install-skills.sh${NC} ${YELLOW}--list${NC}                List available sections"
    echo -e "  ${CYAN}./install-skills.sh${NC} ${YELLOW}--dry-run${NC} ${GREEN}<section>${NC}  Preview without installing"
    echo -e "  ${CYAN}./install-skills.sh${NC} ${YELLOW}--all${NC}                 Install all skills from all sections"
    echo -e "  ${CYAN}./install-skills.sh${NC} ${YELLOW}--help${NC}                Show this help message"
    echo ""
    echo -e "${BOLD}Sections:${NC}"
    echo -e "  ${GREEN}general${NC}     Foundational skills (always included)"
    echo -e "  ${GREEN}aso${NC}         App Store Optimization"
    echo -e "  ${GREEN}ios${NC}         iOS Development (includes general)"
    echo -e "  ${GREEN}macos${NC}       macOS Development (includes general)"
    echo -e "  ${GREEN}visionos${NC}    visionOS Development (includes general)"
    echo -e "  ${GREEN}website${NC}     Website Development (includes general)"
    echo -e "  ${GREEN}firebase${NC}    Firebase (includes general)"
    echo -e "  ${GREEN}supabase${NC}    Supabase (includes general)"
    echo ""
    echo -e "${DIM}Each section automatically includes general skills as a baseline.${NC}"
    echo ""
}

get_skills_for_section() {
    local section="$1"
    case "$section" in
        general)   echo "$SKILLS_GENERAL" ;;
        aso)       echo "$SKILLS_ASO" ;;
        ios)       echo "$SKILLS_IOS" ;;
        macos)     echo "$SKILLS_MACOS" ;;
        visionos)  echo "$SKILLS_VISIONOS" ;;
        website)   echo "$SKILLS_WEBSITE" ;;
        firebase)  echo "$SKILLS_FIREBASE" ;;
        supabase)  echo "$SKILLS_SUPABASE" ;;
        *)         echo "" ;;
    esac
}

list_sections() {
    print_header
    echo -e "${BOLD}Available sections:${NC}"
    echo ""

    local sections=("general" "aso" "ios" "macos" "visionos" "website" "firebase" "supabase")
    for section in "${sections[@]}"; do
        local skills
        skills=$(get_skills_for_section "$section")
        local count
        if [ -z "$skills" ]; then
            count=0
        else
            count=$(echo "$skills" | wc -w | tr -d ' ')
        fi

        if [ "$count" -eq 0 ]; then
            echo -e "  ${DIM}${section}${NC}  ${DIM}(empty — coming soon)${NC}"
        else
            echo -e "  ${GREEN}${section}${NC}  ${CYAN}${count} skill(s)${NC}: ${skills}"
        fi
    done
    echo ""
}

deduplicate() {
    echo "$@" | tr ' ' '\n' | sort -u | tr '\n' ' '
}

install_skill() {
    local skill="$1"
    local dry_run="${2:-false}"

    if [ "$dry_run" = "true" ]; then
        echo -e "  ${YELLOW}⏭${NC}  Would install: ${BOLD}${skill}${NC}"
        return 0
    fi

    echo -e "  ${BLUE}⬇${NC}  Installing ${BOLD}${skill}${NC}..."

    # Create .agents/skills directory if it doesn't exist
    mkdir -p .agents/skills

    # Check if skill is already installed
    if [ -d ".agents/skills/${skill}" ] || [ -L ".agents/skills/${skill}" ]; then
        echo -e "  ${GREEN}✓${NC}  ${skill} already installed — skipping"
        return 0
    fi

    # Try installing via the skill registry (npx-based)
    # Falls back to creating a placeholder directory if the registry is unavailable
    if command -v npx &> /dev/null; then
        if npx -y @anthropic/skill install "$skill" 2>/dev/null; then
            echo -e "  ${GREEN}✓${NC}  ${skill} installed successfully"
        else
            echo -e "  ${YELLOW}⚠${NC}  Registry unavailable for ${skill} — creating placeholder"
            mkdir -p ".agents/skills/${skill}"
            cat > ".agents/skills/${skill}/SKILL.md" <<EOF
---
name: ${skill}
description: Placeholder — install manually or update when registry is available.
---

# ${skill}

This skill was created as a placeholder by install-skills.sh.
Replace this file with the actual skill content.
EOF
            echo -e "  ${GREEN}✓${NC}  ${skill} placeholder created"
        fi
    else
        echo -e "  ${RED}✗${NC}  npx not found — please install Node.js first"
        return 1
    fi
}

# ─── Main ─────────────────────────────────────────────────────

DRY_RUN=false
INSTALL_ALL=false
SECTION=""

# Parse arguments
while [[ $# -gt 0 ]]; do
    case "$1" in
        --help|-h)
            usage
            exit 0
            ;;
        --list|-l)
            list_sections
            exit 0
            ;;
        --dry-run|-n)
            DRY_RUN=true
            shift
            ;;
        --all|-a)
            INSTALL_ALL=true
            shift
            ;;
        -*)
            echo -e "${RED}Error: Unknown option '$1'${NC}"
            echo "Run './install-skills.sh --help' for usage."
            exit 1
            ;;
        *)
            SECTION="$1"
            shift
            ;;
    esac
done

if [ "$INSTALL_ALL" = "false" ] && [ -z "$SECTION" ]; then
    usage
    exit 1
fi

print_header

# Collect skills
ALL_SKILLS=""

if [ "$INSTALL_ALL" = "true" ]; then
    echo -e "${BOLD}Installing all skills from all sections...${NC}"
    echo ""
    for s in general aso ios macos visionos website firebase supabase; do
        section_skills=$(get_skills_for_section "$s")
        ALL_SKILLS="$ALL_SKILLS $section_skills"
    done
else
    # Validate section
    section_skills=$(get_skills_for_section "$SECTION")
    if [ -z "$section_skills" ] && [ "$SECTION" != "general" ]; then
        # Check if section exists but is empty
        case "$SECTION" in
            general|aso|ios|macos|visionos|website|firebase|supabase)
                if [ -z "$section_skills" ] && [ "$SECTION" != "general" ]; then
                    echo -e "${YELLOW}⚠  Section '${SECTION}' has no skills yet (coming soon).${NC}"
                    echo -e "${DIM}   Installing general skills only.${NC}"
                    echo ""
                fi
                ;;
            *)
                echo -e "${RED}Error: Unknown section '${SECTION}'${NC}"
                echo "Run './install-skills.sh --list' to see available sections."
                exit 1
                ;;
        esac
    fi

    echo -e "${BOLD}Section:${NC} ${GREEN}${SECTION}${NC}"

    # Always include general
    if [ "$SECTION" != "general" ]; then
        echo -e "${DIM}Including general skills as baseline...${NC}"
        ALL_SKILLS="$SKILLS_GENERAL $section_skills"
    else
        ALL_SKILLS="$SKILLS_GENERAL"
    fi
fi

echo ""

# Deduplicate
UNIQUE_SKILLS=$(deduplicate $ALL_SKILLS)

# Count
SKILL_COUNT=$(echo "$UNIQUE_SKILLS" | wc -w | tr -d ' ')
if [ "$SKILL_COUNT" -eq 0 ]; then
    echo -e "${YELLOW}No skills to install.${NC}"
    exit 0
fi

if [ "$DRY_RUN" = "true" ]; then
    echo -e "${YELLOW}Dry run — ${SKILL_COUNT} skill(s) would be installed:${NC}"
else
    echo -e "${BLUE}Installing ${SKILL_COUNT} skill(s)...${NC}"
fi
echo ""

# Install each skill
INSTALLED=0
FAILED=0
for skill in $UNIQUE_SKILLS; do
    if install_skill "$skill" "$DRY_RUN"; then
        ((INSTALLED++))
    else
        ((FAILED++))
    fi
done

echo ""
if [ "$DRY_RUN" = "true" ]; then
    echo -e "${GREEN}✓  Dry run complete. ${INSTALLED} skill(s) would be installed.${NC}"
else
    if [ "$FAILED" -eq 0 ]; then
        echo -e "${GREEN}✓  Done! ${INSTALLED} skill(s) installed successfully.${NC}"
    else
        echo -e "${YELLOW}⚠  ${INSTALLED} installed, ${FAILED} failed.${NC}"
    fi
fi

# Remind about symlinks for .agent/skills
echo ""
echo -e "${DIM}Tip: Symlink skills to .agent/skills/ for your project:${NC}"
echo -e "${DIM}  ln -s ../../.agents/skills/<name> .agent/skills/<name>${NC}"
echo ""
