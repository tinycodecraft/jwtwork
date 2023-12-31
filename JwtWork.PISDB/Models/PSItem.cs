﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace JwtWork.PISDB.Models;

public partial class PSItem
{
    [Key]
    public int Id { get; set; }

    public int PSJobID { get; set; }

    [Required]
    [StringLength(500)]
    public string Description { get; set; }

    public string SourceDirectory { get; set; }

    public string ThumbDirectory { get; set; }

    [StringLength(500)]
    public string GroupValue { get; set; }

    [StringLength(500)]
    public string FileName { get; set; }

    public bool Disabled { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? UpdatedAt { get; set; }

    [StringLength(50)]
    public string UpdatedBy { get; set; }

    [InverseProperty("PSItem")]
    public virtual ICollection<PSItemLink> PSItemLink { get; set; } = new List<PSItemLink>();

    [ForeignKey("PSJobID")]
    [InverseProperty("PSItem")]
    public virtual PSJob PSJob { get; set; }
}